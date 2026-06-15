
import React from 'react';
import Layout from '../../components/legal-library/Layout';
//import SearchBox from '../../components/legal-library/SearchBox';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ChiefJustice {
  id: string;
  name: string;
  period: string;
  tenure: string;
  notableCases: string[];
  description: string;
}

const ChiefJustices = () => {
  const justices: ChiefJustice[] = [
    {
      id: "dheera-cji",
      name: "Justice D. Y. Chandrachud",
      period: "9 November 2022 - Present",
      tenure: "Current",
      notableCases: ["Arnab Goswami v. State of Maharashtra", "Romila Thapar v. Union of India"],
      description: "Dr. Justice Dhananjaya Yashwant Chandrachud is the 50th Chief Justice of India. Prior to his elevation as a Judge of the Supreme Court, he served as Chief Justice of the Allahabad High Court and a Judge of the Bombay High Court. He is known for his progressive judgments on privacy, gender equality, and civil liberties."
    },
    {
      id: "lalit-cji",
      name: "Justice Uday Umesh Lalit",
      period: "27 August 2022 - 8 November 2022",
      tenure: "74 days",
      notableCases: ["Electoral Bonds Case", "Hijab Ban Case"],
      description: "Justice Uday Umesh Lalit served as the 49th Chief Justice of India. Before his elevation to the bench, he was a renowned senior advocate at the Supreme Court. Despite his short tenure as CJI, he introduced significant reforms in the listing and hearing of cases."
    },
    {
      id: "ramana-cji",
      name: "Justice N. V. Ramana",
      period: "24 April 2021 - 26 August 2022",
      tenure: "1 year, 4 months",
      notableCases: ["Pegasus Spyware Case", "Central Vista Project Case"],
      description: "Justice Nuthalapati Venkata Ramana served as the 48th Chief Justice of India. During his tenure, he made significant contributions to the areas of judicial appointments, freedom of speech, and transparency in governance."
    },
    {
      id: "bobde-cji",
      name: "Justice S. A. Bobde",
      period: "18 November 2019 - 23 April 2021",
      tenure: "1 year, 5 months",
      notableCases: ["Ayodhya Land Dispute Review Petitions", "Farm Laws Case"],
      description: "Justice Sharad Arvind Bobde served as the 47th Chief Justice of India. His tenure was marked by the challenges of administering justice during the COVID-19 pandemic, which led to the rapid digitization of court processes in India."
    },
    {
      id: "gogoi-cji",
      name: "Justice Ranjan Gogoi",
      period: "3 October 2018 - 17 November 2019",
      tenure: "1 year, 1 month",
      notableCases: ["Ayodhya Land Dispute", "Rafale Deal Case", "NRC for Assam"],
      description: "Justice Ranjan Gogoi served as the 46th Chief Justice of India and was the first person from Northeast India to reach the position. His tenure saw several landmark judgments including the Ayodhya verdict. After retirement, he was nominated to the Rajya Sabha."
    },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-legal-navy">Chief Justices of India</h1>
        <p className="text-slate-600 mb-6">
          Profiles and contributions of all Chief Justices of India since the establishment of the Supreme Court in 1950.
        </p>
       
      </div>

      <div className="grid grid-cols-1 gap-6">
        {justices.map((justice) => (
          <Card key={justice.id} className="overflow-hidden">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-20 w-20 mb-3 bg-legal-navy text-white">
                  <span className="text-xl">{justice.name.split(' ').map(n => n[0]).join('')}</span>
                </Avatar>
                <Badge className="bg-legal-burgundy">
                  {justice.period}
                </Badge>
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">{justice.name}</h2>
                <p className="text-slate-700 mb-4">{justice.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-500 mb-1">Tenure</h3>
                  <p className="text-slate-700">{justice.tenure}</p>
                </div>
                
                {justice.notableCases.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-1">Notable Cases</h3>
                    <ul className="list-disc list-inside text-slate-700">
                      {justice.notableCases.map((caseTitle, index) => (
                        <li key={index}>{caseTitle}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default ChiefJustices;