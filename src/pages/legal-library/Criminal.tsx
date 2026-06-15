
import React from 'react';
import Layout from '../../components/legal-library/Layout';
//import SearchBox from '../../components/legal-library/SearchBox';
import LawAccordion from '../../components/legal-library/LawAccordian';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Criminal = () => {
  // Sample IPC sections
  const ipcSections = [
    {
      id: "sec-299",
      title: "Section 299 - Culpable Homicide",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide."
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> This section defines culpable homicide, which is the act of causing death with the intention to cause death or with the knowledge that the act is likely to cause death. It is the genus of which murder is a species.
          </p>
          <p>
            <strong>Key Cases:</strong> State of A.P. v. R. Punnayya (1976), Pulicherla Nagaraju v. State of A.P. (2006)
          </p>
        </>
      )
    },
    {
      id: "sec-300",
      title: "Section 300 - Murder",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "Culpable homicide is murder if the act by which the death is caused is done with the intention of causing death, or... (lists four conditions that elevate culpable homicide to murder)"
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> This section defines murder as culpable homicide with specific intentions or knowledge. It also includes exceptions where culpable homicide is not murder, such as grave and sudden provocation, exceeding the right of private defense, etc.
          </p>
          <p>
            <strong>Key Cases:</strong> K.M. Nanavati v. State of Maharashtra (1962), Bachan Singh v. State of Punjab (1980)
          </p>
        </>
      )
    },
    {
      id: "sec-375",
      title: "Section 375 - Rape",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "A man is said to commit 'rape' if he penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person; or inserts, to any extent, any object or a part of the body, not being the penis, into the vagina, the urethra or anus of a woman or makes her to do so with him or any other person..."
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> This section defines the offense of rape, which was significantly amended in 2013 following the Delhi gang rape case. It now has a broader definition and includes various acts beyond traditional penetration.
          </p>
          <p>
            <strong>Key Cases:</strong> Mukesh & Anr. v. State (NCT of Delhi) & Ors. (2017), Independent Thought v. Union of India (2017)
          </p>
        </>
      )
    },
  ];

  // Sample CrPC sections
  const crpcSections = [
    {
      id: "crpc-154",
      title: "Section 154 - Information in cognizable cases",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant..."
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> This section deals with the recording of First Information Report (FIR) in cognizable offenses. It mandates that police must register an FIR upon receiving information about a cognizable offense.
          </p>
          <p>
            <strong>Key Cases:</strong> Lalita Kumari v. Government of Uttar Pradesh & Ors. (2013)
          </p>
        </>
      )
    },
    {
      id: "crpc-161",
      title: "Section 161 - Examination of witnesses by police",
      content: (
        <>
          <p className="mb-3">
            <strong>Text:</strong> "Any police officer making an investigation under this Chapter, or any police officer not below such rank as the State Government may, by general or special order, prescribe, may examine orally any person supposed to be acquainted with the facts and circumstances of the case."
          </p>
          <p className="mb-3">
            <strong>Explanation:</strong> This section empowers investigating officers to examine witnesses during investigation. Statements recorded under this section cannot be used as substantive evidence but can be used to contradict or corroborate the witness in court.
          </p>
          <p>
            <strong>Key Cases:</strong> State (NCT of Delhi) v. Navjot Sandhu (2005)
          </p>
        </>
      )
    },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-legal-navy">Criminal Laws</h1>
        <p className="text-slate-600 mb-6">
          Explore the provisions of the Indian Penal Code (IPC) and Code of Criminal Procedure (CrPC) with detailed explanations and case references.
        </p>
       
      </div>

      <Tabs defaultValue="ipc" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="ipc">Indian Penal Code (IPC)</TabsTrigger>
          <TabsTrigger value="crpc">Code of Criminal Procedure (CrPC)</TabsTrigger>
          <TabsTrigger value="evidence">Indian Evidence Act</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ipc">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-legal-navy">Indian Penal Code, 1860</h2>
            <p className="text-slate-600 mb-6">
              The Indian Penal Code (IPC) is the official criminal code of India. It is a comprehensive code intended to cover all substantive aspects of criminal law.
            </p>
            <LawAccordion items={ipcSections} />
          </div>
        </TabsContent>
        
        <TabsContent value="crpc">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-legal-navy">Code of Criminal Procedure, 1973</h2>
            <p className="text-slate-600 mb-6">
              The Code of Criminal Procedure (CrPC) is the procedural law providing the machinery for punishment of offenders under the substantive criminal law.
            </p>
            <LawAccordion items={crpcSections} />
          </div>
        </TabsContent>
        
        <TabsContent value="evidence">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-legal-navy">Indian Evidence Act, 1872</h2>
            <p className="text-slate-600 mb-6">
              The Indian Evidence Act contains rules regarding admissibility of evidence in Indian courts.
            </p>
            <p className="text-slate-500 italic">Content for this section will be available soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Criminal;