
import React from 'react';
import Layout from '../../components/legal-library/Layout';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Judgements = () => {
  const landmarkCases = [
    {
      title: "HIS HOLINESS KESAVANANDA BHARATI SRIPADAGALAVARU vs. STATE OF KERALA",
      dateOfJudgememt : "24 April 1973",
      CaseType : "WRIT PETITION (CIVIL) /135/1970",
      summary: "The Supreme Court established the 'basic structure doctrine', which limits Parliament's power to amend the Constitution. This case is considered one of the most important cases in India's constitutional history.",
      link : "https://digiscr.sci.gov.in/view_judgment?id=MzI1NTk%3D"
    },
    {
      title: "MANEKA GANDHI vs. UNION OF INDIA",
      dateOfJudgememt : "25 January 1978",
      CaseType : "ORIGINAL SUIT /231/1977",
      summary: "The judgement of Maneka Gandhi's case widened the scope of article 21 and personal liberty and preserved the fundamental right to life. This judgement interlinked the provisions of articles 19,14, and 21",
      link : "https://digiscr.sci.gov.in/view_judgment?id=NjE1MQ%3D%3D"
    },
    {
      title: "MOHD. AHMED KHAN vs. SHAH BANO BEGUM AND ORS.",
      dateOfJudgememt : "23 April 1985",
      CaseType : "CIVIL APPEAL /103/1981",
      summary: "Ahmad Khan v. Shah Bano Begum [1985], commonly referred to as the Shah Bano case, was a controversial maintenance lawsuit in India, in which the Supreme Court delivered a judgment in favour of providing maintenance to an aggrieved divorced Muslim woman.",
      link : "https://digiscr.sci.gov.in/view_judgment?id=MTU0Nzk%3D"
    },
    {
      title: "VISHAKA AND ORS. vs. STATE OF RAJASTHAN AND ORS.",
      dateOfJudgememt : "13 August 1997",
      CaseType : "WRIT PETITION(CRIMINAL) /666/1992",
      summary: "It addressed the issue of sexual harassment in the workplace and established guidelines for its prevention and redressal, known as the Vishaka Guidelines.",
      link : "https://digiscr.sci.gov.in/view_judgment?id=MzA5MDA%3D"
    },
    {
      title: "NAVTEJ SINGH JOHAR & ORS. vs. UNION OF INDIA THR. SECRETARY MINISTRY OF LAW AND JUSTICE",
      dateOfJudgememt : "06 September 2016",
      CaseType : "WRIT PETITION(CRIMINAL)/76/2016",
      summary: "The Supreme Court of India decriminalized consensual same-sex relations between adults, ruling that Section 377 of the Indian Penal Code, which criminalized such acts, was unconstitutional.",
      link : "https://digiscr.sci.gov.in/view_judgment?id=MTkzOQ%3D%3D"
    },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-legal-secondary">Important Judgements</h1>
        <p className="text-slate-600 mb-6">
          Explore landmark judgements by the Supreme Court and High Courts that have shaped Indian law.
        </p>
              </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-legal-secondary">Landmark Cases</h2>
        <div className="space-y-4">
          {landmarkCases.map((caseItem, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{caseItem.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline" className="bg-legal-secondary text-white">
                    {caseItem.dateOfJudgememt}
                  </Badge>
                  <Badge variant="outline" className="bg-slate-600 text-white">
                    Case Type : {caseItem.CaseType} 
                  </Badge>
                 
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-slate-600">{caseItem.summary}</p>
                <div className="mt-3 text-right">
                  <a href={caseItem.link} className="text-legal-burgundy hover:text-legal-secondary font-medium text-sm">
                    Read Full Judgment →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">More Categories Coming Soon</h2>
        <p className="text-slate-600">
          We're continuously expanding our collection of important judgments. Soon we will include more categories such as:
        </p>
      
      </div>
    </Layout>
  );
};

export default Judgements;