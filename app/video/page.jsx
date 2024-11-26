"use client";

import { useState } from "react";
import { FaVideo } from "react-icons/fa";

export default function VideoPage() {
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isValidVideo, setIsValidVideo] = useState(true);
  const [dragging, setDragging] = useState(false);


  const handleDragEnter = () => setDragging(true);
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
        setIsValidVideo(true);
      };
      reader.readAsDataURL(file);
    } else {
      setIsValidVideo(false);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
        setIsValidVideo(true);
      };
      reader.readAsDataURL(file);
    } else {
      setIsValidVideo(false);
    }
  };

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleUrlSubmit = () => {
    const regex = /\.(mp4|avi|mov|wmv)$/i;
    if (regex.test(videoUrl)) {
      setVideo(videoUrl);
      setIsValidVideo(true);
    } else {
      setIsValidVideo(false);
    }
  };

  const handleCheckPlateNumber = () => {
    alert("Check Plate Number clicked!");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-indigo-900 mb-6">Upload or Enter Video URL</h1>

      {/* Bagian Upload Drag-and-Drop Video */}
      <div
        className={`bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-dashed ${
          dragging ? "border-indigo-600" : "border-gray-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-center text-lg font-medium text-gray-700">
          Drag and drop your video here
        </p>

        <div className="flex justify-center my-4">
          <FaVideo className="text-gray-600 text-8xl" />
        </div>

        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className="block text-center text-indigo-600 hover:text-indigo-700 mt-4 cursor-pointer"
        >
          Choose a file or drag it here
        </label>
      </div>

      {/* Input URL Video */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <label htmlFor="video-url" className="block text-lg font-medium text-gray-700 mb-2">
          Or Enter Video URL
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="video-url"
            value={videoUrl}
            onChange={handleUrlChange}
            className="p-3 border border-gray-300 rounded-l-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter video URL"
          />
          <button
            onClick={handleUrlSubmit}
            className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>

      {video && isValidVideo ? (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <div className="flex justify-center">
            <video controls className="max-w-full max-h-96 object-contain rounded-lg shadow-md">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        ) : (
          !isValidVideo && (
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
              <p className="text-red-500 font-medium">Invalid video or URL. Please upload a valid video.</p>
            </div>
          )
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleCheckPlateNumber}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          Check Plate Number
        </button>
      </div>
    </div>
  );
}
