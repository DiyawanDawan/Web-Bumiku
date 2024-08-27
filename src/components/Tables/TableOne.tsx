import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';
import LoadingSpiner from '../Spiner/Loading.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

interface SensorData {
  id: string;
  sensorType: string;
  value: number;
  unit: string;
  createdAt: string;
}

interface DecodedToken {
  role: string;
}

const TableOne = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 5;

  // Decode JWT token and get the user's role
  const token = localStorage.getItem('authToken');
  let userRole = 'user';

  if (token) {
    const decodedToken: DecodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DBSourse.allDataSensor();
        setSensorData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNextPage = () => {
    if (pageIndex < sensorData.length - itemsPerPage) {
      setPageIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrevPage = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Apakah Anda ingin menghapus data sensor ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await DBSourse.deleteData(id);
        if (response.success === true) {
          setSensorData(sensorData.filter((data) => data.id !== id));
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        // console.error('Error deleting sensor data:', error);
        toast.error('Terjadi kesalahan saat menghapus data sensor.');
      }
    }
  };
  

  const visibleData = sensorData.slice(pageIndex, pageIndex + itemsPerPage);
  const currentPage = Math.ceil((pageIndex + 1) / itemsPerPage);
  const totalPages = Math.ceil(sensorData.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Detection Sensor
        </h4>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-slate-500 border-stroke border-b-2">
                  <th className="p-2.5 xl:p-5">No</th>
                  <th className="p-2.5 text-center xl:p-5">DETECTION</th>
                  <th className="p-2.5 text-center sm:p-2 xl:p-5">VALUE (ppm pH)</th>
                  <th className="p-2.5 text-center xl:p-5">UNIT</th>
                  <th className="p-2.5 text-center xl:p-5">CREATED AT</th>
                  {userRole === 'admin' && <th className="p-2.5 text-center xl:p-5">ACTION</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={userRole === 'admin' ? 6 : 5} className="text-center py-4">
                      <LoadingSpiner />
                    </td>
                  </tr>
                ) : (
                  <>
                    {visibleData.map((data, index) => (
                      <tr
                        key={index}
                        className={`${
                          index === visibleData.length - 1 ? '' : 'border-b border-stroke dark:border-indigo-200'
                        }`}
                      >
                        <td className="p-2.5 xl:p-5">{index + 1 + pageIndex}</td>
                        <td className="p-2.5 text-center xl:p-5">{data.sensorType}</td>
                        <td className="p-2.5 text-center xl:p-5">{data.value}</td>
                        <td className="p-2.5 text-center xl:p-5">{data.unit}</td>
                        <td className="p-2.5 text-center xl:p-5">{data.createdAt}</td>
                        {userRole === 'admin' && (
                          <td className="p-2.5 text-center xl:p-5">
                            <button
                              onClick={() => handleDelete(data.id)}
                              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 active:bg-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 m-4">
            <button
              className={`bg-indigo-500 py-1 px-3 sm:py-2 sm:px-5 rounded-md outline-2 outline-blue-500/50 hover:bg-indigo-600 active:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300 text-lg text-whiten ${pageIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className={`bg-indigo-500 py-1 px-3 sm:py-2 sm:px-5 rounded-md outline-2 outline-blue-500/50 hover:bg-indigo-600 active:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300 text-lg text-whiten ${pageIndex + itemsPerPage >= sensorData.length ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handleNextPage}
              disabled={pageIndex + itemsPerPage >= sensorData.length}
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

export default TableOne;
