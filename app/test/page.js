'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [detectedPlates, setDetectedPlates] = useState([]);
  const [detectionMessage, setDetectionMessage] = useState('Waiting for vehicle detection...');
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    if (model) {
      const setupCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: 'environment' },
            });
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            videoRef.current.onloadeddata = () => {
              setVideoReady(true);
            };
          } catch (err) {
            console.error('Error accessing camera:', err);
            setDetectionMessage('Error accessing camera.');
          }
        }
      };

      setupCamera();
    }
  }, [model]);

  useEffect(() => {
    if (videoReady && model) {
      const detectObjects = async () => {
        if (videoRef.current && model) {
          const videoWidth = videoRef.current.videoWidth;
          const videoHeight = videoRef.current.videoHeight;

          if (videoWidth === 0 || videoHeight === 0) {
            console.error('Invalid video size:', videoWidth, videoHeight);
            return;
          }

          const predictions = await model.detect(videoRef.current);
          const vehicles = predictions.filter(pred => pred.class === 'car' || pred.class === 'truck');

          if (vehicles.length > 0) {
            setDetections(vehicles);
            setDetectionMessage(`Detected ${vehicles.length} vehicle(s)!`);

            // const detectedPlate = `Plate-${Math.floor(Math.random() * 10000)}`;
            // setDetectedPlates(prevPlates => [...prevPlates, detectedPlate]);
            setVehicleCount(prevCount => prevCount + vehicles.length);
          } else {
            setDetectionMessage('No vehicles detected.');
          }

          drawBoundingBoxes(vehicles);
          requestAnimationFrame(detectObjects); 
        }
      };

      detectObjects();
    }
  }, [videoReady, model]);

  const drawBoundingBoxes = (vehicles) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    vehicles.forEach(vehicle => {
      const [x, y, width, height] = vehicle.bbox;

      context.beginPath();
      context.rect(x, y, width, height);
      context.lineWidth = 4;
      context.strokeStyle = 'green';
      context.fillStyle = 'green';
      context.stroke();
    });
  };

  return (
    <div className="min-h-screen bg-[#171a30] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">APNR With Camera</h1>
      <p className="mb-4 text-lg text-center">{detectionMessage}</p>

      <div className="relative mb-6">
        <video
          ref={videoRef}
          className="w-full h-[540px] border-4 border-indigo-300 rounded-lg shadow-lg"
          autoPlay
          muted
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '8px',
          }}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-[540px] border-4 border-indigo-300 rounded-lg shadow-lg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            borderRadius: '8px',
          }}
        />
      </div>

      <div className="bg-[#1e2236] text-white p-4 rounded-lg shadow-md mt-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Detected Vehicles</h2>
        <ul className="max-h-48 overflow-y-auto">
          {detectedPlates.length === 0 ? (
            <li className="text-gray-400">No vehicles detected yet.</li>
          ) : (
            detectedPlates.map((plate, index) => (
              <li key={index} className="border-b border-gray-600 py-1">
                {plate}
              </li>
            ))
          )}
        </ul>
        <div className="mt-4">
          <span className="font-bold">Total Vehicles: </span>
          {vehicleCount}
        </div>
      </div>
    </div>
  );
}
