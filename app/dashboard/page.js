"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const totalVehicleData = {
    images: 125,
    videos: 200,
  };

  const topRegionsData = [
    { region: "Jakarta", count: 45 },
    { region: "Bandung", count: 38 },
    { region: "Surabaya", count: 32 },
    { region: "Medan", count: 28 },
    { region: "Yogyakarta", count: 20 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card: Total Vehicle Recognized from Images */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Total Vehicle Recognized from Images</h2>
          <p className="text-4xl font-bold">{totalVehicleData.images}</p>
        </div>

        {/* Card: Total Vehicle Recognized from Videos */}
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Total Vehicle Recognized from Videos</h2>
          <p className="text-4xl font-bold">{totalVehicleData.videos}</p>
        </div>
      </div>

      {/* Top 5 Regions with Most Scanned License Plates */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Total Vehicle by Region</h2>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topRegionsData}>
              <XAxis dataKey="region" tick={{ fill: "#8884d8" }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
