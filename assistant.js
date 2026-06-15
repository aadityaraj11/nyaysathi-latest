import express from 'express';
import { readFile } from 'fs/promises';
import cors from 'cors';
import 'dotenv/config';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings, Ollama } from "@langchain/ollama";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import crypto from 'crypto';
import { client } from './supabase/client.js';
import pdfParse from 'pdf-parse';
import multer from 'multer';
import fs from 'fs/promises';


const assistant = express();
assistant.use(cors());
assistant.use(express.json());


const upload = multer({ dest: 'uploads/' });


const llm = new Ollama({
  model: "deepseek-r1:1.5b",
  temperature: 0,
  baseUrl: "http://localhost:11434",
  maxRetries: 2
});

const embeddings = new OllamaEmbeddings({
  model: "deepseek-r1:1.5b",
  baseUrl: "http://localhost:11434"
});

let vectorStore;


function hashContent(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}


assistant.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No file uploaded');

  try {
    // Read the uploaded file buffer
    const fileBuffer = await fs.readFile(file.path);
    
    console.log("Read file buffer:", fileBuffer.slice(0, 100));

    // Delete old PDFs from Supabase storage
    const { data: listData, error: listError } = await client
      .storage.from('pdfs').list();

    if (listError) {
      console.error("Error listing files:", listError);
    } else {
      const filesToDelete = listData.map(file => file.name);
      if (filesToDelete.length) {
        const { error: delError } = await client
          .storage.from('pdfs')
          .remove(filesToDelete);

        if (delError) console.error("Error deleting old files:", delError);
        else console.log("Deleted old files:", filesToDelete);
      }
    }

    // Upload new PDF
    const { error: uploadError } = await client.storage
      .from('pdfs')
      .upload(file.originalname, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError.message);
      return res.status(500).send(uploadError.message);
    }

  // Delete all old chunks from 'documents' table
    const { error: deleteError } = await client
      .from('documents')
      .delete()
      .neq('id', 0);

    if (deleteError) {
      console.error("Error deleting old chunks:", deleteError);
    } else {
      console.log("Old chunks deleted from 'documents' table");
    }

    // Parse PDF content
    const pdfText = await pdfParse(fileBuffer);
    const text = pdfText.text;
    console.log("Extracted text length:", text.length);

    // Split PDF text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const chunks = await splitter.createDocuments([text]);
    console.log("Chunks created:", chunks.length);

    // Hash and prepare chunks for storing in Supabase
    const hashedChunks = chunks.map(doc => {
      const hash = hashContent(doc.pageContent);
      return { ...doc, metadata: { hash } };
    });

    if (hashedChunks.length > 0) {
      // Insert chunks into Supabase
      await SupabaseVectorStore.fromDocuments(hashedChunks, embeddings, {
        client,
        tableName: 'documents',
      });
      console.log(`Inserted ${hashedChunks.length} new chunks.`);
    } else {
      console.log("No new chunks to insert.");
    }

    // Update vector store
    vectorStore = await SupabaseVectorStore.fromExistingIndex(embeddings, {
      client,
      tableName: "documents"
    });

    res.status(200).json({
      message: 'Uploaded and processed successfully',
      chunks: hashedChunks.length
    });
  } catch (err) {
    console.error("Upload/processing error:", err);
    res.status(500).send("Error processing the file");
  }
});

// Chat endpoint to ask questions based on the uploaded PDF
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an assistant who answers questions based only on the given context."],
  ["human", "Context: {context}\n\nQuestion: {question}"]
]);

assistant.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: "Invalid question" });
  }

  if (!vectorStore) {
    return res.status(400).json({ error: "No PDF uploaded yet." });
  }

  try {
    // Search for similar documents in the vector store
    const docs = await vectorStore.similaritySearch(question, 3);
    const context = docs.map(doc => doc.pageContent).join("\n\n");

    const chain = RunnableSequence.from([prompt, llm]);
    const answer = await chain.invoke({ context, question });
    // console.log(answer)

    res.json({ answer });
  } catch (err) {
    console.error("LLM Error:", err);
    res.status(500).json({ error: "LLM Error", msg: err.message });
  }
});

// Initialize the server
assistant.listen(8000, () => {
  console.log('🚀 Server running on http://localhost:8000');
});
