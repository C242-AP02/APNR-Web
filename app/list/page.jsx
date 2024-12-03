"use client";
import { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { FaEye } from "react-icons/fa";

export default function VehicleList() {
  const data = [
    {
      plateNumber: "B1234XYZ",
      region: "Jakarta",
      date: 1635769200000,
      vehicleType: "Car",
      detailUrl: "/detail",
    },
    {
      plateNumber: "D5678ABC",
      region: "Bandung",
      date: 1635855600000,
      vehicleType: "Motorcycle",
      detailUrl: "/detail",
    },
    {
      plateNumber: "F9012DEF",
      region: "Surabaya",
      date: 1635942000000,
      vehicleType: "Truck",
      detailUrl: "/detail",
    },
    {
      plateNumber: "B3456GHI",
      region: "Medan",
      date: 1636028400000,
      vehicleType: "Car",
      detailUrl: "/detail",
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Plate Number",
        accessor: "plateNumber",
      },
      {
        Header: "Region",
        accessor: "region",
      },
      {
        Header: "Date and Time",
        accessor: "date",
        Cell: ({ value }) => {
          const [formattedDate, setFormattedDate] = useState(null);

          useEffect(() => {
            const date = new Date(value);
            setFormattedDate(date.toLocaleString());
          }, [value]);

          return formattedDate ? formattedDate : "Loading...";
        },
      },
      // {
      //   Header: "Vehicle Type",
      //   accessor: "vehicleType",
      // },
      {
        Header: "Actions",
        accessor: "detailUrl",
        Cell: ({ value }) => (
          <a
            href={value}
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
          >
            <FaEye /> <span>Detail</span>
          </a>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">Vehicle List</h1>

      {/* Table */}
      <div className="overflow-auto bg-white shadow-lg rounded-lg w-full max-w-5xl">
        <table
          {...getTableProps()}
          className="min-w-full border-collapse border border-gray-200"
        >
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            {headerGroups.map((headerGroup, groupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={groupIndex}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wide"
                    key={colIndex}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="py-4 px-6 text-sm text-gray-800"
                      key={`${cell.row.id}-${cell.column.id}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
