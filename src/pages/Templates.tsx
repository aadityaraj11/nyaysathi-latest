import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

/* ------------------------------------------------------------------
   Template data – now each template has its own description
-------------------------------------------------------------------*/
const templateCategories = [
  {
    category: "Rental",
    templates: [
      {
        id: 1,
        title: "MOVE INSPECTION CHECKLIST",
        downloads: 2480,
        downloadUrl: "/Templets/Rental/MOVE INSPECTION CHECKLIST.pdf",
        description:
          "Document the property’s condition before tenants move in to avoid future disputes.",
      },
      {
        id: 2,
        title: "RENT INCREASE NOTICE",
        downloads: 1890,
        downloadUrl: "/Templets/Rental/RENT INCREASE NOTICE.pdf",
        description:
          "Formally notify tenants about upcoming rent adjustments while staying compliant.",
      },
      {
        id: 3,
        title: "RENT RECEIPT",
        downloads: 3250,
        downloadUrl: "/Templets/Rental/RENT RECEIPT.pdf",
        description:
          "Provide tenants with a clear record of payment for bookkeeping and proof of rent paid.",
      },
      {
        id: 4,
        title: "STANDARD LEASE AGREEMENT",
        downloads: 2130,
        downloadUrl: "/Templets/Rental/STANDARD LEASE AGREEMENT.pdf",
        description:
          "A comprehensive lease outlining rights, duties, and safeguards for both parties.",
      },
    ],
  },
  {
    category: "Loans",
    templates: [
      {
        id: 5,
        title: "LOAN ACKNOWLEDGEMENT LETTER",
        downloads: 4270,
        downloadUrl: "/Templets/Loans/LOAN ACKNOWLEDGEMENT LETTER.pdf",
        description:
          "Confirm receipt and terms of a loan in a concise, legally-sound letter.",
      },
      {
        id: 6,
        title: "LOAN AGREEMENT",
        downloads: 2580,
        downloadUrl: "/Templets/Loans/LOAN AGREEMENT.pdf",
        description:
          "Define principal, interest, and repayment schedule in an enforceable contract.",
      },
      {
        id: 7,
        title: "LOAN CLEARANCE CERTIFICATE",
        downloads: 1950,
        downloadUrl: "/Templets/Loans/LOAN CLEARANCE CERTIFICATE.pdf",
        description:
          "Certify full repayment and close outstanding financial obligations.",
      },
      {
        id: 8,
        title: "LOAN REQUEST LETTER",
        downloads: 1430,
        downloadUrl: "/Templets/Loans/LOAN REQUEST LETTER.pdf",
        description:
          "Formally request funding while outlining purpose and repayment intent.",
      },
    ],
  },
  {
    category: "Legal",
    templates: [
      {
        id: 9,
        title: "General Affidavit",
        downloads: 6840,
        downloadUrl: "/Templets/legal/Affidavit Format.pdf",
        description:
          "Sworn statement template suitable for a wide range of legal declarations.",
      },
      {
        id: 10,
        title: "CONSENT LETTER",
        downloads: 5120,
        downloadUrl: "/Templets/legal/CONSENT LETTER.pdf",
        description:
          "Record formal permission or approval in situations requiring documented consent.",
      },
      {
        id: 11,
        title: "CONTRACT AGREEMENT",
        downloads: 4730,
        downloadUrl: "/Templets/legal/CONTRACT AGREEMENT.pdf",
        description:
          "Solid framework for creating binding agreements between multiple parties.",
      },
      {
        id: 12,
        title: "Power of Attorney",
        downloads: 2170,
        downloadUrl: "/Templets/legal/Power of Attorney.pdf",
        description:
          "Grant authority to act on your behalf with clearly defined powers and limits.",
      },
    ],
  },
  {
    category: "Employment",
    templates: [
      {
        id: 13,
        title: "Employment Agreement",
        downloads: 5290,
        downloadUrl: "/Templets/legal/Employment Agreement.pdf",
        description:
          "Detail job terms, duties, and remuneration in a clear employer–employee contract.",
      },
      {
        id: 14,
        title: "JOB OFFER LETTER",
        downloads: 4180,
        downloadUrl: "/Templets/legal/JOB OFFER LETTER.pdf",
        description:
          "Extend employment offers with role, salary, and start-date specifics.",
      },
      {
        id: 15,
        title: "WARNING LETTER",
        downloads: 2340,
        downloadUrl: "/Templets/legal/WARNING LETTER.pdf",
        description:
          "Formally document disciplinary actions and expectations for improvement.",
      },
      {
        id: 16,
        title: "Letter of Termination",
        downloads: 1720,
        downloadUrl: "/Templets/legal/Letter of Termination.pdf",
        description:
          "Terminate employment while outlining final obligations and compliance steps.",
      },
    ],
  },
];

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/
const Templates = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />

    {/* Hero */}
    <section className="bg-legal-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <FileText className="h-16 w-16 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Legal Document Templates</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Access professionally drafted legal templates that you can customize for your specific needs.
        </p>
      </div>
    </section>

    {/* Tabs */}
    <section className="py-16 flex-grow">
      <div className="container mx-auto px-4">
        <Tabs defaultValue={templateCategories[0].category.toLowerCase()}>
          {/* Tab Triggers */}
          <div className="flex justify-center mb-8">
            <TabsList className="h-auto p-1">
              {templateCategories.map((cat) => (
                <TabsTrigger key={cat.category} value={cat.category.toLowerCase()} className="px-6 py-2">
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {templateCategories.map((category) => (
            <TabsContent key={category.category} value={category.category.toLowerCase()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-legal-light pb-2">
                      <CardTitle className="text-legal-primary">{template.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="h-4 w-4 mr-1" />
                          {template.downloads.toLocaleString()} downloads
                        </div>
                      </CardDescription>
                    </CardHeader>

                    {/* <── new per-file description here */}
                    <CardContent className="pt-6">
                      <p className="text-gray-600">{template.description}</p>
                    </CardContent>

                  <CardFooter className="border-t bg-gray-50 py-4 justify-center">
                      <a href={template.downloadUrl} download className="w-full max-w-[200px]">
                        <Button className="w-full bg-legal-primary hover:bg-legal-secondary flex justify-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </a>
                  </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>

    {/* Steps */}
    <section className="py-16 bg-legal-light">
      {/* (unchanged “How to Use” section) */}
    </section>

    <Footer />
  </div>
);

export default Templates;
