
import React from 'react';
import { BookOpen, FileText, Users, Bookmark, List } from 'lucide-react';
import Layout from '../../components/legal-library/Layout';
import CategoryCard from '../../components/legal-library/CategoryCard';
//import SearchBox from '../../components/legal-library/SearchBox';

const LegalLibrary = () => {
  const categories = [
    {
      title: "Constitution of India",
      description: "Articles of the Constitution grouped and explained with interpretations and amendments.",
      path: "/legal-library/constitution",
      count: 448,
      icon: <BookOpen className="h-5 w-5" />,
      tags: ["Fundamental Rights", "Directive Principles", "Constitutional Amendments"]
    },
    {
      title: "Criminal Laws",
      description: "Indian Penal Code (IPC) and Code of Criminal Procedure (CrPC) provisions and explanations.",
      path: "/legal-library/criminal",
      count: 511,
      icon: <FileText className="h-5 w-5" />,
      tags: ["IPC", "CrPC", "Criminal Jurisprudence"]
    },
    {
      title: "Civil Laws",
      description: "Comprehensive coverage of civil laws, procedures, and remedies in India.",
      path: "/legal-library/civil",
      count: 386,
      icon: <FileText className="h-5 w-5" />,
      tags: ["CPC", "Evidence Act", "Contracts", "Property"]
    },
    {
      title: "Family Laws",
      description: "Laws related to marriage, adoption, succession, inheritance, and family disputes.",
      path: "/legal-library/family",
      count: 205,
      icon: <Users className="h-5 w-5" />,
      tags: ["Marriage", "Adoption", "Succession", "Inheritance"]
    },
    {
      title: "Important Judgements",
      description: "Landmark judgements by the Supreme Court and High Courts that shaped Indian law.",
      path: "/legal-library/judgements",
      count: 327,
      icon: <Bookmark className="h-5 w-5" />,
      tags: ["Supreme Court", "High Courts", "Precedents"]
    },
    {
      title: "Chief Justices of India",
      description: "Comprehensive list and profiles of all Chief Justices of India since independence.",
      path: "/legal-library/cji",
      count: 50,
      icon: <List className="h-5 w-5" />,
      tags: ["Supreme Court", "Judicial History", "Legal Luminaries"]
    }
  ];

  return (
    <Layout>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-legal-navy">Digital Legal Library</h1>
        <p className="text-slate-600 mb-6">
          Access comprehensive information on Indian laws, landmark judgements, and legal resources.
        </p>
        <div className="mb-8">
                 </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-legal-navy border-b pb-2">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <CategoryCard
              key={category.path}
              title={category.title}
              description={category.description}
              path={category.path}
              count={category.count}
              icon={category.icon}
              tags={category.tags}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default LegalLibrary;