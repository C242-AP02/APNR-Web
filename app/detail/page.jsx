"use client";
import { useState, useEffect } from "react";
import { FaCalendar, FaMapMarkerAlt, FaCar } from "react-icons/fa";
import Image from "next/image"; // Import the Image component from Next.js

export default function VehicleDetail() {
  const vehicle = {
    plateNumber: "B1234XYZ",
    region: "Jakarta",
    date: 1635769200000,
    vehicleType: "Car",
    imageUrl: "https://via.placeholder.com/600x400.png?text=Vehicle+Detection+Image",
  };

  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const date = new Date(vehicle.date);
    setFormattedDate(date.toLocaleString());
  }, [vehicle.date]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-8">Vehicle Detail</h1>

      <div className="flex gap-8">
        {/* Vehicle Image Section */}
        <div className="flex-shrink-0 w-1/2">
          <Image
            src={vehicle.imageUrl}
            alt={`Detection of ${vehicle.plateNumber}`}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Vehicle Information Section */}
        <div className="w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Information</h2>

            <div className="space-y-4">
              {/* Plate Number */}
              <div className="flex items-center space-x-2">
                <FaCar className="text-gray-500" />
                <span className="text-gray-700">Plate Number:</span>
                <span className="font-semibold">{vehicle.plateNumber}</span>
              </div>

              {/* Region */}
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <span className="text-gray-700">Region:</span>
                <span className="font-semibold">{vehicle.region}</span>
              </div>

              {/* Date and Time */}
              <div className="flex items-center space-x-2">
                <FaCalendar className="text-gray-500" />
                <span className="text-gray-700">Date and Time:</span>
                <span className="font-semibold">{formattedDate || "Loading..."}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
