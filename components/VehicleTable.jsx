"use client";
import { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { FaBackspace, FaEye, FaFilter, FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VehicleTable({ plateData, uniqueRegions }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State Halaman
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"), 10) || 1
  );

  const itemsPerPage = 20;

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: (_, rowIndex) => rowIndex + 1 + (currentPage - 1) * itemsPerPage,
        Cell: ({ value }) => <div className="text-center">{value}</div>,
      },
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
        accessor: "timestamp",
        Cell: ({ value }) => {
          const [formattedDate, setFormattedDate] = useState(null);
      
          useEffect(() => {
            if (value) {
              const date = new Date(parseInt(value, 10)); 
              setFormattedDate(date.toLocaleString());
            }
          }, [value]);
      
          return formattedDate ? formattedDate : "Loading...";
        },
      },
      {
        Header: "Actions",
        accessor: "id", 
        Cell: ({ value }) => (
          <Link
            href={`/list/${value}`}
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
          >
            <FaEye /> <span>Detail</span>
          </Link>
        ),
      }
    ],
    [currentPage]
  );

  // State Filters
  const [filters, setFilters] = useState({
    region: searchParams.get("region") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    items: searchParams.get("items") ? decodeURIComponent(searchParams.get("items")).split(",") : [],
    plate: searchParams.get("plate") || "",
  });

  // Filtered & Paginated Data
  const filteredData = useMemo(() => {
    const filtered = plateData.filter((item) => {
      const matchRegion = filters.region
        ? item.region.toLowerCase().includes(filters.region.toLowerCase())
        : true;
      const matchPlate = filters.plate
        ? item.plateNumber.toLowerCase().includes(filters.plate.toLowerCase())
        : true;
      const matchStartDate = filters.startDate
        ? item.timestamp >= Date.parse(filters.startDate)
        : true;
      const matchEndDate = filters.endDate
        ? item.timestamp <= Date.parse(filters.endDate)
        : true;
      const matchItems = filters.items?.length > 0
        ? filters.items.includes(item.id)
        : true;
      return matchRegion && matchPlate && matchStartDate && matchEndDate && matchItems;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }, [filters, plateData, currentPage, itemsPerPage]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: filteredData });

  // Update URL with Filters and Pagination
  const updateURL = (newFilters, page) => {
    const params = new URLSearchParams();
    if (newFilters.region) params.set("region", newFilters.region);
    if (newFilters.startDate) params.set("startDate", newFilters.startDate);
    if (newFilters.endDate) params.set("endDate", newFilters.endDate);
    if (newFilters.plate) params.set("plate", newFilters.plate);
    params.set("page", page || 1);

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    setFilters({
      region: searchParams.get("region") || "",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      items: searchParams.get("items") ? decodeURIComponent(searchParams.get("items")).split(",") : [],
      plate: searchParams.get("plate") || "",
    })
  }, [searchParams]);

  const [isFilterShow, setIsFilterShow] = useState(false);
  const isFilterSet = !!filters.region || !!filters.startDate || !!filters.endDate;

  // Update Filters
  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setCurrentPage(1);
    updateURL(newFilters, 1);
  };

  // Reset Filters
  const resetFilters = () => {
    const defaultFilters = { region: "", startDate: "", endDate: "", plate: "" };
    setCurrentPage(1);
    updateURL(defaultFilters, 1);
  };

  const totalPages = Math.ceil(
    plateData.filter((item) => {
      const matchRegion = filters.region
        ? item.region.toLowerCase().includes(filters.region.toLowerCase())
        : true;
      const matchStartDate = filters.startDate
        ? item.timestamp >= Date.parse(filters.startDate)
        : true;
      const matchEndDate = filters.endDate
        ? item.timestamp <= Date.parse(filters.endDate)
        : true;
      const matchPlate = filters.plate
        ? item.plateNumber.toLowerCase().includes(filters.plate.toLowerCase())
        : true;
      return matchRegion && matchStartDate && matchEndDate && matchPlate;
    }).length / itemsPerPage
  );

  // Pagination Handler 
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURL(filters, page);
  };

  // Pagination Controls
  const getPagination = () => {
    const pagination = [];
    if (currentPage > 1) {
      pagination.push({ label: "<<", page: 1 });
      pagination.push({ label: "<", page: currentPage - 1 });
    }
    if (currentPage > 4) pagination.push({ label: "...", page: null });

    for (let i = Math.max(1, currentPage - 3); i <= Math.min(totalPages, currentPage + 3); i++) {
      pagination.push({ label: i, page: i });
    }

    if (currentPage < totalPages - 3) pagination.push({ label: "...", page: null });
    if (currentPage < totalPages) {
      pagination.push({ label: ">", page: currentPage + 1 });
      pagination.push({ label: ">>", page: totalPages });
    }
    return pagination;
  };

  return (
    <>
      {/* Filter Section */}
      {!filters.items?.length && (
      // lg:border-none lg:p-0 lg:shadow-none lg:top-0 lg:bg-white lg:relative lg:flex lg:flex-row lg:space-x-4 lg:space-y-0 lg:my-4
        <div className="relative w-full max-w-5xl flex justify-between mb-2">
          <button 
              className={`text-white px-6 py-2 flex justify-center items-center gap-2 bg-indigo-700 rounded-3xl`}
              onClick={() => {
                setIsFilterShow(!isFilterShow);
              }}
            >
            <FaFilter color="white"/> Filter
          </button>
            <div className={`absolute shadow-2xl flex-col space-y-6 py-8 rounded-lg bg-white px-8 top-12 -left-5 z-10 border border-indigo-700 w-96 ${isFilterShow ? "flex" : "hidden"}`}>
              <h2 className="text-lg font-bold text-indigo-700 text-center mb-4">
                Filter Options
              </h2>

              <div className="flex items-center space-x-4">
                <label htmlFor="region" className="text-gray-600 font-medium w-28">
                  Region
                </label>
                <select
                  id="region"
                  value={filters.region}
                  onChange={(e) => updateFilters("region", e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-full w-full"
                  style={{ width: "100%", maxWidth: "100%" }} 
                >
                  <option value="">Select region</option>
                  {uniqueRegions.map((region, index) => (
                    <option key={index} value={region} style={{ width: "100%", maxWidth: "100%" }} >
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label htmlFor="startDate" className="text-gray-600 font-medium w-28">
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => updateFilters("startDate", e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label htmlFor="endDate" className="text-gray-600 font-medium w-28">
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => updateFilters("endDate", e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={resetFilters}
                  className={`${
                    isFilterSet ? "flex" : "hidden"
                  } items-center space-x-2 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-transform duration-300 transform hover:scale-105`}
                >
                  <FaBackspace />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search Plate Number"
                value={filters.plate}
                onChange={(e) => updateFilters("plate", e.target.value)}
                className="py-2 pl-10 pr-4 w-48 sm:w-64 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FaSearch className="absolute top-2/4 left-3 -translate-y-2/4 text-gray-400" />
            </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto bg-white rounded-lg w-full max-w-5xl">
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
                      className="py-4 px-6 text-sm text-gray-800 font-medium"
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

      {/* Pagination */}
      {!filters.items?.length && (
        <div className="flex space-x-2 mt-4">
          {getPagination().map((item, index) => (
            <button
              key={index}
              onClick={() => item.page && handlePageChange(item.page)}
              className={`px-3 py-1 border rounded ${
                item.page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              disabled={!item.page}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {!!filters.items?.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              router.push("/list");
              router.refresh;
            }}
            className="py-3 px-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Back to List
          </button>
        </div>
      )}
    </>
  )
}
