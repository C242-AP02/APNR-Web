"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImagesPage() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isValidImage, setIsValidImage] = useState(true);
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = () => setDragging(true);
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsValidImage(true);
      };
      reader.readAsDataURL(file);
    } else {
      setIsValidImage(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsValidImage(true);
      };
      reader.readAsDataURL(file);
    } else {
      setIsValidImage(false);
    }
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    handleUrlSubmit
  };

  const handleUrlSubmit = () => {
    const regex = /\.(jpeg|jpg|gif|png)$/i;
    if (regex.test(imageUrl)) {
      setImage(imageUrl);
      setIsValidImage(true);
    } else {
      setIsValidImage(false);
    }
  };

  const handleCheckPlateNumber = () => {
    alert("Check Plate Number clicked!");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-indigo-900 mb-6">Upload or Enter Image URL</h1>

      {/* Bagian Upload Drag-and-Drop */}
      <div
        className={`bg-gray-100 p-6 rounded-lg shadow-lg border-2 border-dashed ${
          dragging ? "border-indigo-600" : "border-gray-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-center text-lg font-medium text-gray-700">Drag and drop your image here</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="block text-center text-indigo-600 hover:text-indigo-700 mt-4 cursor-pointer"
        >
          Choose a file or drag it here
        </label>
      </div>

      {/* Input URL Image */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <label htmlFor="image-url" className="block text-lg font-medium text-gray-700 mb-2">
          Or Enter Image URL
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="image-url"
            value={imageUrl}
            onChange={handleUrlChange}
            className="p-3 border border-gray-300 rounded-l-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter image URL"
          />
          <button
            onClick={handleUrlSubmit}
            className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        {image && isValidImage ? (
          <div className="flex justify-center">
            <Image
              src={image}
              alt="Uploaded"
              className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
            />
          </div>
        ) : (
          !isValidImage && (
            <p className="text-red-500 font-medium">Invalid image or URL. Please upload a valid image.</p>
          )
        )}
      </div>

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
