"use client";
import { useState, useEffect, useMemo } from "react";
import { UserAuth } from "@/context/authContext";
import { BACKEND_URL } from "@/constant/configuration";
import Link from "next/link";
import VehicleTable from "@/components/VehicleTable";
import StatusBox from "@/components/StatusBox";

export default function VehicleList() {
  const { user } = UserAuth();

  // Data Dummy
  // const plateData = useMemo(
  //   () =>
  //     Array.from({ length: 200 }, (_, i) => ({
  //       plateNumber: `B${1000 + i}XYZ`,
  //       region: ["Jakarta", "Bandung", "Surabaya", "Medan"][i % 4],
  //       date: 1635769200000 + i * 86400000,
  //       vehicleType: ["Car", "Motorcycle", "Truck"][i % 3],
  //       detailUrl: "/list/FHkrt",
  //     })),
  //   []
  // );

  const [plateData, setPlateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uniqueRegions = Array.from(new Set(
    plateData.map(item => item.region)
  ));

  useEffect(() => {
    const fetchPlateData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BACKEND_URL}/get-list`, {
          method: "GET",
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch plate data");
        }
        const data = await response.json();
        setPlateData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlateData();
  }, [user?.uid]);

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-800 mb-8">Vehicle List</h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-12 w-12"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-10">
          <StatusBox message={error} />
        </div>
      ) : (plateData.length === 0) ? (
        <div className="flex flex-col w-full justify-center items-center py-10">
          <StatusBox message={"No Items yet"}/>
          <div className="flex justify-center mt-6">
            <Link
              href={"/image"}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
            >
              Upload Image
            </Link>
          </div>
        </div>
      ) : (
        <VehicleTable uniqueRegions={uniqueRegions} plateData={plateData} />
      )}

    </div>
  );
}
