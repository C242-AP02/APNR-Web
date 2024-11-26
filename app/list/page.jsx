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
        Header: "Date",
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
      {
        Header: "Vehicle Type",
        accessor: "vehicleType",
      },
      {
        Header: "Actions",
        accessor: "detailUrl",
        Cell: ({ value }) => (
          <a href={value} className="text-blue-500 hover:text-blue-700 flex items-center space-x-2">
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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Vehicle List</h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table {...getTableProps()} className="min-w-full">
          <thead>
            {headerGroups.map((headerGroup, groupIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={groupIndex}>
                {headerGroup.headers.map((column, colIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      className="py-3 px-6 text-left text-sm font-bold text-gray-600 border-b"
                      key={colIndex}
                    >
                      {column.render("Header")}
                    </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="py-3 px-6 text-sm text-gray-700 border-b"
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
