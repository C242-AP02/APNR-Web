"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function Home() {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const [detectionMessage, setDetectionMessage] = useState('Waiting for vehicle detection...');
  
  // Load the YOLOv5 model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel('path_or_url_to_model/model.json');
        setModel(loadedModel);
      } catch (err) {
        console.error('Error loading YOLOv5 model:', err);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (err) {
          console.error('Error accessing camera:', err);
        }
      }
    };

    if (model) {
      setupCamera();
      detectObjects();
    }
  }, [model]);

  const detectObjects = async () => {
    if (videoRef.current && model) {
      const predictions = await model.detect(videoRef.current);
      const vehicles = predictions.filter(pred => pred.class === 'car' || pred.class === 'truck');
      
      if (vehicles.length > 0) {
        setDetections(vehicles);
        setDetectionMessage(`Detected ${vehicles.length} vehicle(s)!`);
      } else {
        setDetectionMessage('No vehicles detected.');
      }

      requestAnimationFrame(detectObjects);  // Loop detection
    }
  };

  return (
    <div className="min-h-screen bg-[#171a30] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Vehicle Detection with YOLOv5</h1>
      <p className="mb-4 text-lg">{detectionMessage}</p>
      <div className="w-full max-w-4xl">
        <div className="relative mb-6">
          <video
            ref={videoRef}
            className="w-full h-[480px] border-4 border-indigo-300 rounded-lg shadow-lg"
            autoPlay
            muted
          />
        </div>
        <div className="bg-white text-black p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Detected Vehicles</h2>
          <ul className="max-h-48 overflow-y-auto">
            {detections.length === 0 ? (
              <li className="text-gray-500">No vehicles detected yet.</li>
            ) : (
              detections.map((vehicle, index) => (
                <li key={index} className="border-b border-gray-300 py-1">
                  {vehicle.class} - {vehicle.score.toFixed(2)}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
