import React from 'react'

const TableTHead = () => {
  return (
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
  )
}

export default TableTHead