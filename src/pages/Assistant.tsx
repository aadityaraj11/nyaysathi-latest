// FRONTEND - Assistant.tsx
import React, { useState, FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';

const Assistant = () => {
  const [question, setQuestion] = useState('');
  const [responseHistory, setResponseHistory] = useState<{ sender: 'user' | 'bot'; message: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  

  const handleFileUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setResponseHistory(prev => [...prev, { sender: 'bot', message: '⚠️ Please upload a PDF file first.' }]);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsLoading(true);
    setResponseHistory(prev => [...prev, { sender: 'bot', message: '📤 Uploading and processing the file...' }]);

    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setResponseHistory(prev => [...prev, { sender: 'bot', message: '❌ ' + (data.message || 'Server error') }]);
        return;
      }

      setIsFileUploaded(true);
      setResponseHistory(prev => [...prev, { sender: 'bot', message: `✅ File uploaded successfully. (${data.chunks} chunks)` }]);
    } catch (error) {
      console.error('Upload error:', error);
      setResponseHistory(prev => [...prev, { sender: 'bot', message: '❌ Upload failed.' }]);
     
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    if (!isFileUploaded) {
      setResponseHistory(prev => [...prev, { sender: 'bot', message: '⚠️ Please upload a PDF first.' }]);
      return;
    }

    setResponseHistory(prev => [...prev, { sender: 'user', message: question }]);
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const cleanAnswer = data.answer?.replace(/<think>[\s\S]*?<\/think>/, '').trim();

      setResponseHistory(prev => [
        ...prev,
        { sender: 'bot', message: cleanAnswer || '🤖 No response found.' },
      ]);
    } catch (error) {
      console.error('Request failed', error);
      setResponseHistory(prev => [...prev, { sender: 'bot', message: '❌ Failed to contact server.' }]);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen  flex flex-col font-sans">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Ask <span className="text-emerald-600">NyaySathi</span>
      </h2>

      <form onSubmit={handleFileUpload} className="flex items-center gap-4 mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="file:px-4 file:py-2 file:border-0 file:bg-gray-400 file:text-white file:rounded-lg file:cursor-pointer text-sm text-gray-700"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 "
        >
          Upload PDF
        </button>
     
      </form>

      <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm h-96 overflow-y-auto">
        {responseHistory.map((entry, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
              entry.sender === 'user'
                ? 'bg-emerald-600 text-white self-end'
                : 'bg-gray-100 text-gray-800 self-start'
            }`}
          >
            {entry.sender === 'bot' ? (
              <ReactMarkdown>{entry.message}</ReactMarkdown>
            ) : (
              entry.message
            )}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm self-start">
            🤔 Thinking...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Assistant;