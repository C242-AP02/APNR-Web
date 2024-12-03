"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const [selectedInterval, setSelectedInterval] = useState("daily");
  const confidenceLevel = "98.5%";

  const intervalData = {
    daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [{ name: "Vehicle Count", data: [1500, 1800, 1700, 1600, 1550, 1800, 1400] }],
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [{ name: "Vehicle Count", data: [5000, 5400, 4900, 5100] }],
    },
    monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      series: [{ name: "Vehicle Count", data: [20000, 23000, 22000, 21000, 24000, 25000, 26000] }],
    },
  };

  const topRegionsData = {
    labels: ["Jakarta", "Bandung", "Surabaya", "Surakarta", "Medan", "Yogyakarta", "Bali"],
    series: [{ name: "Region Count", data: [45, 38, 32, 30, 28, 20, 18] }],
  };

  return (
    <div className="w-full p-6">

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Total Recognized and Confidence */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-2">Total Vehicle Recognized from Images</h2>
            <p className="text-4xl font-bold">125</p>
          </div>

          <div className="bg-indigo-700 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-2">Total Vehicle Recognized from Videos</h2>
            <p className="text-4xl font-bold">200</p>
          </div>

          {/* <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-2">Confidence Level</h2>
            <p className="text-4xl font-bold">{confidenceLevel}</p>
          </div> */}
        </div>

        {/* Column 2: Graphs */}
        <div className="space-y-6 md:col-span-2">
          {/* Dynamic Graph */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Vehicle Detection</h2>

            {/* Interval Selection */}
            <div className="flex space-x-2 mb-4">
              {["daily", "weekly", "monthly"].map((interval) => (
                <button
                  key={interval}
                  className={`px-4 py-2 rounded ${
                    selectedInterval === interval
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedInterval(interval)}
                >
                  {interval.charAt(0).toUpperCase() + interval.slice(1)}
                </button>
              ))}
            </div>

            {/* Line Chart */}
            <Chart
              options={{
                chart: { type: "line" },
                xaxis: { categories: intervalData[selectedInterval].labels },
                stroke: { curve: "smooth" },
                colors: ["#1E90FF"],
              }}
              series={intervalData[selectedInterval].series}
              type="line"
              height={300}
            />
          </div>

          {/* Top Regions Graph */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Total Vehicle by Region</h2>
            <Chart
              options={{
                chart: { type: "bar" },
                xaxis: { categories: topRegionsData.labels },
                colors: ["#4338ca"],
              }}
              series={topRegionsData.series}
              type="bar"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
