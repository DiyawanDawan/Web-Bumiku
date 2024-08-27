import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import { DefaultLayout } from '../layout/DefaultLayout';

interface MyJwtPayload {
  role: string;
  // Tambahkan properti lain jika ada
}

const Tables = ({ userRole }: { userRole: string | null }) => {
  useEffect(() => {
    document.title = userRole === 'admin' ? 'Tables | Cinta Dunia' : 'Download | Cinta Dunia';
  }, [userRole]);

  // Ubah state untuk mendukung tipe MyJwtPayload atau null
  const [decodedToken, setDecodedToken] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    // Ambil token dari localStorage atau tempat penyimpanan lainnya
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Dekode token dan simpan di state
      const decoded = jwtDecode<MyJwtPayload>(token);
      setDecodedToken(decoded);
    }
  }, []);
 
  return (
    <DefaultLayout>
       <Breadcrumb pageName={userRole === 'admin' ? 'Download' : 'Tables'} />

      <div className="flex flex-col gap-10">
        {decodedToken?.role === 'admin' ? (
          <TableThree />
        ) : (
          <>
            <TableOne />
            <TableThree />
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
