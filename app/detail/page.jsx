"use client";
import { useState, useEffect } from "react";
import { FaCalendar, FaMapMarkerAlt, FaCar } from "react-icons/fa";
import Image from "next/image";

export default function VehicleDetail() {
  const vehicle = {
    plateNumber: "B1234XYZ",
    region: "Jakarta",
    date: 1635769200000,
    vehicleType: "Car",
    imageUrl: "/dummy-vehicle-detected.jpg",
  };

  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const date = new Date(vehicle.date);
    setFormattedDate(date.toLocaleString());
  }, [vehicle.date]);

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-6xl w-full">
        {/* Title */}
        <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">
          Vehicle Details
        </h1>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Vehicle Image Section */}
          <div className="flex-shrink-0 w-full md:w-3/5">
            <Image
              src={vehicle.imageUrl}
              alt={`Detection of ${vehicle.plateNumber}`}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Vehicle Information Section */}
          <div className="w-full md:w-2/5">
            <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 p-4 rounded-lg shadow-md">
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

                {/* Region */}
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Region</p>
                    <p className="font-bold text-base">{vehicle.region}</p>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center space-x-3">
                  <FaCalendar className="text-green-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Date and Time</p>
                    <p className="font-bold text-base">
                      {formattedDate || "Loading..."}
                    </p>
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
