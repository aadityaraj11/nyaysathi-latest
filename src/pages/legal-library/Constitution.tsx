
import React from 'react';
import Layout from '../../components/legal-library/Layout';
//import SearchBox from '../../components/legal-library/SearchBox';
import LawAccordion from '../../components/legal-library/LawAccordian';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const Constitution = () => {
  // Sample data for constitutional articles
  const fundamentalRights = [
    {
      id: "art-14",
      title: "Article 14 - Right to Equality",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> Article 14 embodies the general principle of equality before law and equal protection of laws. It prohibits class legislation but permits reasonable classification provided it is founded on an intelligible differentia which distinguishes persons grouped together from those left out and the differentia has a rational nexus to the object sought to be achieved.
          </p>
          <p>
            <strong>Key Cases:</strong> E. P. Royappa v. State of Tamil Nadu (1974), Maneka Gandhi v. Union of India (1978)
          </p>
        </>
      )
    },
    {
      id: "art-19",
      title: "Article 19 - Freedom of Speech, Assembly, Association, Movement, Residence, and Profession",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "All citizens shall have the right to (a) freedom of speech and expression; (b) assemble peaceably and without arms; (c) form associations or unions; (d) move freely throughout the territory of India; (e) reside and settle in any part of the territory of India; (f) practice any profession, or to carry on any occupation, trade or business."
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> Article 19 guarantees six fundamental freedoms to all citizens of India. These rights are not absolute and the State can impose reasonable restrictions on them in the interests of sovereignty and integrity of India, security of the State, friendly relations with foreign States, public order, decency or morality, contempt of court, defamation, and incitement to an offence.
          </p>
          <p>
            <strong>Key Cases:</strong> Romesh Thappar v. State of Madras (1950), Shreya Singhal v. Union of India (2015)
          </p>
        </>
      )
    },
    {
      id: "art-21",
      title: "Article 21 - Protection of Life and Personal Liberty",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "No person shall be deprived of his life or personal liberty except according to procedure established by law."
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> Article 21 guarantees the right to life and personal liberty. The Supreme Court has expanded this article to include various rights such as the right to live with human dignity, right to livelihood, right to health, right to pollution-free environment, right to privacy, and many more.
          </p>
          <p>
            <strong>Key Cases:</strong> Maneka Gandhi v. Union of India (1978), K.S. Puttaswamy v. Union of India (2017)
          </p>
        </>
      )
    },
  ];

  const directivePrinciples = [
    {
      id: "art-38",
      title: "Article 38 - State to secure a social order for the promotion of welfare",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "(1) The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of the national life. (2) The State shall, in particular, strive to minimise the inequalities in income, and endeavour to eliminate inequalities in status, facilities and opportunities, not only amongst individuals but also amongst groups of people residing in different areas or engaged in different vocations."
          </p>
          <p>
            <strong>Explanation:</strong> Article 38 directs the State to establish a social order where social, economic, and political justice prevails and to minimize inequalities in income, status, facilities, and opportunities.
          </p>
        </>
      )
    },
    {
      id: "art-39",
      title: "Article 39 - Certain principles of policy to be followed by the State",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "The State shall direct its policy towards securing (a) adequate means of livelihood for citizens; (b) distribution of ownership and control of material resources to serve common good; (c) economic system not resulting in concentration of wealth; (d) equal pay for equal work; (e) protection of health and strength of workers; (f) opportunities for children to develop in a healthy manner."
          </p>
          <p>
            <strong>Explanation:</strong> Article 39 outlines specific principles to be included in state policy, focusing on economic justice, protection of workers, equal pay for equal work, and protection of children.
          </p>
        </>
      )
    },
  ];

  // Group tabs data
  const groupedArticles = [
    { id: "fundamental-rights", title: "Fundamental Rights (Articles 12-35)", items: fundamentalRights },
    { id: "directive-principles", title: "Directive Principles (Articles 36-51)", items: directivePrinciples },
    { id: "fundamental-duties", title: "Fundamental Duties (Article 51A)", items: [] },
    { id: "union-and-territories", title: "Union and its Territories (Articles 1-4)", items: [] },
    { id: "citizenship", title: "Citizenship (Articles 5-11)", items: [] },
    { id: "parliament", title: "Parliament (Articles 79-122)", items: [] },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <BookOpen className="h-8 w-8 text-legal-burgundy mr-3" />
          <h1 className="text-3xl font-bold text-legal-navy">Constitution of India</h1>
        </div>
        <p className="text-slate-600 mb-6">
          Explore the articles of the Indian Constitution with detailed explanations, interpretations, and case references.
        </p>
      
      </div>

      <Card className="mb-8 border-legal-gold border-l-4">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-legal-burgundy">About the Constitution of India</h2>
          <p className="text-slate-600 mb-3">
            The Constitution of India is the supreme law of India and lays down the framework that demarcates fundamental political code, structure, procedures, powers, and duties of government institutions and sets out fundamental rights, directive principles, and duties of citizens.
          </p>
          <p className="text-slate-600 mb-3">
            Adopted on 26 November 1949 and came into effect on 26 January 1950, it is the longest written constitution of any country, containing 448 articles in 25 parts, 12 schedules, 5 appendices, and 124 amendments.
          </p>
          <p className="text-slate-600">
            B. R. Ambedkar is regarded as the chief architect of the Indian Constitution. The constitution declares India to be a sovereign, socialist, secular, and democratic republic, assuring its citizens justice, equality, and liberty, and endeavours to promote fraternity.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="fundamental-rights" className="mb-8">
        <TabsList className="mb-6 flex flex-wrap h-auto bg-slate-100 p-1">
          {groupedArticles.map((group) => (
            <TabsTrigger 
              key={group.id} 
              value={group.id} 
              className="mb-1 data-[state=active]:bg-legal-navy data-[state=active]:text-white"
            >
              {group.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {groupedArticles.map((group) => (
          <TabsContent key={group.id} value={group.id}>
            <div className="mb-4 pb-2 border-b border-legal-navy/20">
              <h3 className="text-lg font-medium text-legal-navy">{group.title}</h3>
            </div>
            {group.items.length > 0 ? (
              <LawAccordion items={group.items} />
            ) : (
              <Card>
                <CardContent className="p-8 flex flex-col items-center justify-center">
                  <p className="text-slate-500 italic">Content for this section will be available soon.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Layout>
  );
};

export default Constitution;