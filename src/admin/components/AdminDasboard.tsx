import React, { useEffect, useState } from 'react';
import DBSource from '../../data/api/db-sourse.js'; // Pastikan Anda telah mengimport DBSource
import TableOne from '../../components/Tables/TableOne';
import Keterangan from '../../components/Tables/Keterangan';
import { AdminLayout } from '../Layouts/AdminLayouts';
import UserTable from './TableUser';

interface User {
  id: string;
  fullName: string;
  gender: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const DashboardPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await DBSource.allUsers();
        const filteredUsers = usersData.filter((user: { role: string; }) => user.role === 'user');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <Keterangan />
      <div className="mt-4 w-auto md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="max-w-full overflow-x-auto">
          <TableOne />
        </div>
        <div className="mt-4 w-auto md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="max-w-full overflow-x-auto">
            <UserTable users={users} loading={loading} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
