import { FaEye, FaFilePdf } from 'react-icons/fa';
import { Package } from '../../types/package';
import { HiOutlineDownload } from 'react-icons/hi';

const packageData: Package[] = [
  {
    no: 1,
    sesnorType: "PH",
    update: "12 Januari 1024, 10:12:00",
    fileType: <FaFilePdf size={30} />,
    status: "string",
  },
  {
    no: 2,
    sesnorType: "NH3",
    update: "12 Januari 1024, 10:12:00",
    fileType: <FaFilePdf size={30}/>,
    status: "string",
  },
];

const TableThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Download File
      </h4>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Detection
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Update
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                File Type
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.no}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.sesnorType}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.update}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
               <p className="text-red-600 dark:text-red-500">
                    {packageItem.fileType}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                    <FaEye size={20}/>
                    </button>
                   
                    <button className="hover:text-primary">
                    <HiOutlineDownload size={20}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
