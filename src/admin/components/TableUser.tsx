import React, { useState, useEffect } from 'react';
import DBSourse from '../../data/api/db-sourse.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Define the User interface
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

// Define props for UserTable
interface UserTableProps {
  users: User[];
  loading: boolean;
}

// UserTable component
const UserTable: React.FC<UserTableProps> = ({ users, loading }) => {
  const [localUsers, setLocalUsers] = useState<User[]>(users); 
  const [pageIndex, setPageIndex] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    console.log('Updating localUsers from props');
    setLocalUsers(users);
  }, [users]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Apakah Anda ingin menghapus user tersebut?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
    });

    if (result.isConfirmed) {
        try {
            const response = await DBSourse.deleteUser(id);
            if (response.success === true) {
                // console.log(response);
                // Update localUsers state secara langsung
                setLocalUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                toast.success(response.message);
                console.log(response);
            } else {
                toast.error(response.message);
                console.log(response);
            }
        } catch (error) {
            // console.log(response);
            toast.error('Terjadi kesalahan saat menghapus user.');
        }
    }
};

  
  const handlePrevPage = () => {
    setPageIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setPageIndex(prev => Math.min(prev + 1, Math.ceil(localUsers.length / itemsPerPage) - 1));
  };

  const currentPage = pageIndex + 1;
  const totalPages = Math.ceil(localUsers.length / itemsPerPage);
  const visibleData = localUsers.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage);

  // console.log('Visible Data:', visibleData);

  return (
    <div className="overflow-x-auto">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          User List
        </h4>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left dark:bg-slate-500 border-stroke border-b-2">
                  <th className="p-2.5 xl:p-5">No</th>
                  <th className="p-2.5 xl:p-5">Full Name</th>
                  <th className="p-2.5 xl:p-5">Jenis Kelami</th>
                  <th className="p-2.5 xl:p-5">Username</th>
                  <th className="p-2.5 xl:p-5">Email</th>
                  <th className="p-2.5 xl:p-5">Role</th>
                  <th className="p-2.5 xl:p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  visibleData.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`${
                        index === visibleData.length - 1 ? '' : 'border-b border-stroke dark:border-indigo-200'
                      }`}
                    >
                      <td className="p-2.5 xl:p-5">{index + 1 + pageIndex * itemsPerPage}</td>
                      <td className="p-2.5 xl:p-5">{user.fullName}</td>
                      <td className="p-2.5 xl:p-5">{user.gender}</td>
                      <td className="p-2.5 xl:p-5">{user.username}</td>
                      <td className="p-2.5 xl:p-5">{user.email}</td>
                      <td className="p-2.5 xl:p-5">{user.role}</td>
                      <td className="p-2.5 xl:p-5">
                            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                              <Link
                                to={`/admin/update-user/${user.id}`}
                                className="bg-yellow-300 text-neutral-800 py-1 px-3 rounded-md hover:bg-yellow-600 active:bg-yellow-700"
                              >
                                Update
                              </Link>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 active:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 m-4">
            <button
              className={`bg-indigo-500 py-1 px-3 sm:py-2 sm:px-5 rounded-md outline-2 outline-blue-500/50 hover:bg-indigo-600 active:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300 text-lg text-white ${pageIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className={`bg-indigo-500 py-1 px-3 sm:py-2 sm:px-5 rounded-md outline-2 outline-blue-500/50 hover:bg-indigo-600 active:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300 text-lg text-white ${pageIndex + itemsPerPage >= localUsers.length ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handleNextPage}
              disabled={pageIndex + itemsPerPage >= localUsers.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UserTable;
