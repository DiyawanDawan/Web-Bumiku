import React from 'react';
import TableOne from '../../components/Tables/TableOne';
import Keterangan from '../../components/Tables/Keterangan';
import { AdminLayout } from '../Layouts/AdminLayouts';

const DashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <Keterangan />
      <div className="mt-4 w-auto md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <div className="max-w-full overflow-x-auto">
          <TableOne />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
