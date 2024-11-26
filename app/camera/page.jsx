"use client";

import { useState, useEffect } from "react";

export default function CameraPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  // Fetch available video devices
  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setVideoDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDevice(videoInputDevices[0].deviceId); // Select first device by default
        }
      } catch (error) {
        console.error("Error fetching video devices: ", error);
      }
    };

    getVideoDevices();
  }, []);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedDevice ? { exact: selectedDevice } : undefined },
      });
      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };

  const handleStopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  return (
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-6">
        {/* Video Preview */}
        <div className="w-full max-w-4xl">
          <video
            autoPlay
            muted
            ref={(videoElement) => {
              if (videoElement) {
                videoElement.srcObject = cameraStream;
              }
            }}
            className="w-full h-[400px] border-2 border-gray-300 rounded-lg"
          />
        </div>

        {/* Camera Source Selector */}
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="camera-select" className="text-gray-700 font-medium">
            Select Camera:
          </label>
          <select
            id="camera-select"
            className="px-4 py-2 border rounded-lg"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
        </div>

        {/* Start/Stop Buttons */}
        {!isCameraActive ? (
          <button
            onClick={handleStartCamera}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={handleStopCamera}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Stop Camera
          </button>
        )}
      </div>
  );
}
