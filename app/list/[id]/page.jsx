"use client";

import { useState, useEffect } from "react";
import { FaCalendar, FaMapMarkerAlt, FaCar, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { useParams } from "next/navigation";
import { UserAuth } from "@/context/authContext";
import { BACKEND_URL } from "@/constant/configuration";
import Link from "next/link";
import StatusBox from "@/components/StatusBox";

export default function VehicleDetail() {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams()

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/get-vehicle-details/${params.id}`, {
          method: "GET",
          credentials: "include"
        });
  
        if (response.status === 401) {
          throw new Error("You are not authenticated. Please log in.");
        }
  
        if (response.status === 403) {
          throw new Error("You do not have permission to view this vehicle detail.");
        }
  
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle details.");
        }
  
        const data = await response.json();
        setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVehicle();
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="w-full p-6 flex justify-center">
        <StatusBox message={"Loading vehicle data..."} color="blue-500"/>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full p-6 flex justify-center">
        <StatusBox message={`Error: ${error}`} color={"red-500"} />
      </div>
    );
  }
  
  const formattedDate = new Date(vehicle.timestamp).toLocaleString();

  return (
    <div className="w-full p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg border max-w-6xl w-full">
        <div className="mb-3 flex items-center">
          <Link href="/list">
            <div className="flex items-center text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <FaArrowLeft className="mr-2" />
              Kembali
            </div>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">
          Vehicle Details
        </h1>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Vehicle Image Section */}
          <div className="flex-shrink-0 w-full md:w-3/5">
            <Image
              src={vehicle.imageUrl}
              alt={`Detection of ${vehicle.plateNumber}`}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="w-full md:w-2/5">
            <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Vehicle Information
              </h2>

              <div className="space-y-4">
                {/* Plate Number */}
                <div className="flex items-center space-x-3">
                  <FaCar className="text-blue-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Plate Number</p>
                    <p className="font-bold text-base">{vehicle.plateNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Region</p>
                    <p className="font-bold text-base">{vehicle.region}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaCalendar className="text-green-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Date and Time</p>
                    <p className="font-bold text-base">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
