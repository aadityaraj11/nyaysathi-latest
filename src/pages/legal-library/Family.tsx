
import React from 'react';
import Layout from '../../components/legal-library/Layout';
//import SearchBox from '../../components/legal-library/SearchBox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Family = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-legal-navy">Family Laws</h1>
        <p className="text-slate-600 mb-6">
          Explore laws related to marriage, adoption, succession, inheritance, and family disputes in India.
        </p>
        
      </div>

      <Alert className="mb-8">
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          We're currently working on populating this section with comprehensive information on family laws. Check back soon for updates.
        </AlertDescription>
      </Alert>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Family Laws in India - Overview</h2>
        <p className="mb-4">
          Family law in India encompasses personal laws that govern family relationships, including marriage, adoption, succession, inheritance, and family disputes. In India, family laws vary based on religious communities.
        </p>
        <p className="mb-4">
          Some of the important family laws in India include:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700">
          <li>Hindu Marriage Act, 1955</li>
          <li>Special Marriage Act, 1954</li>
          <li>Hindu Adoption and Maintenance Act, 1956</li>
          <li>Muslim Personal Law (Shariat) Application Act, 1937</li>
          <li>Dissolution of Muslim Marriages Act, 1939</li>
          <li>Indian Divorce Act, 1869</li>
          <li>Parsi Marriage and Divorce Act, 1936</li>
          <li>Guardians and Wards Act, 1890</li>
          <li>Juvenile Justice (Care and Protection of Children) Act, 2015</li>
        </ul>
        <p>
          This section will soon include detailed explanations of these laws along with relevant case studies and interpretations.
        </p>
      </div>
    </Layout>
  );
};

export default Family;