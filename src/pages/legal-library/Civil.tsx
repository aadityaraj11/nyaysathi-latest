
import React from 'react';
import Layout from '../../components/legal-library/Layout';
//import SearchBox from '../../components/legal-library/SearchBox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Civil = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-legal-navy">Civil Laws</h1>
        <p className="text-slate-600 mb-6">
          Explore civil laws, procedures, and remedies in India including property laws, contract laws, and more.
        </p>

      </div>

      <Alert className="mb-8">
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          We're currently working on populating this section with comprehensive information on civil laws. Check back soon for updates.
        </AlertDescription>
      </Alert>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Civil Laws in India - Overview</h2>
        <p className="mb-4">
          Civil law in India deals with disputes between individuals, organizations, or between individuals and the state where compensation is awarded to the victim. Civil laws deal with property, contracts, family matters, and personal disputes.
        </p>
        <p className="mb-4">
          Some of the important civil laws in India include:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li>Code of Civil Procedure, 1908</li>
          <li>Indian Contract Act, 1872</li>
          <li>Transfer of Property Act, 1882</li>
          <li>Specific Relief Act, 1963</li>
          <li>Hindu Succession Act, 1956</li>
          <li>Indian Succession Act, 1925</li>
          <li>Registration Act, 1908</li>
        </ul>
        <p>
          This section will soon include detailed explanations of these laws along with relevant case studies and interpretations.
        </p>
      </div>
    </Layout>
  );
};

export default Civil;