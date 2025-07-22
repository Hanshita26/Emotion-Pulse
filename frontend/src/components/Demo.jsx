
"use client";
import React, { useState, useRef, useEffect } from "react";
import Controls from './Controls';

export default function Demo({ onBackToHome }) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Effect to handle video stream assignment
  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      // Force video to play
      videoRef.current.play().catch(console.error);
    }
  }, [cameraStream]);

  // Start the camera with permission
  const startCamera = async () => {
    try {
      setCameraError(null);
      console.log("Requesting camera access...");
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user" // Ensure front camera
        },
        audio: false // Explicitly disable audio
      });
      
      console.log("Camera stream obtained:", stream);
      console.log("Video tracks:", stream.getVideoTracks());
      
      setCameraStream(stream);
      return true;
    } catch (error) {
      console.error("Camera access error: ", error);
      if (error.name === "NotAllowedError") {
        setCameraError("Camera permission denied. Please allow camera access and try again.");
      } else if (error.name === "NotFoundError") {
        setCameraError("No camera found on this device.");
      } else if (error.name === "NotReadableError") {
        setCameraError("Camera is already in use by another application.");
      } else {
        setCameraError("Unable to access camera. Please check your browser settings.");
      }
      return false;
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        track.stop();
        console.log("Stopped track:", track);
      });
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Handle file upload
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Handle the uploaded file here
    }
  };

  // Main page - only start detection button
  if (!showCamera) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
        <h1 className="text-2xl font-semibold text-white">Camera Demo</h1>
        <button
          onClick={async () => {
            const success = await startCamera();
            if (success) {
              setIsDetecting(true);
              setShowCamera(true);
            }
          }}
          className="w-full max-w-xs bg-amber-300 hover:bg-amber-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-play text-lg"></i>
          Start Detection
        </button>
      </div>
    );
  }

  // Camera page - shows camera, upload button, and stop detection
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-semibold text-white">Camera Demo</h1>
      
      {cameraError && <p className="text-red-500">{cameraError}</p>}
      
      {/* Debug info */}
      {cameraStream && (
        <p className="text-green-500 text-sm">
          Camera connected: {cameraStream.getVideoTracks().length} video track(s)
        </p>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted // Add muted to prevent autoplay issues
        className="w-[320px] h-[240px] border-2 border-white rounded-md bg-black"
        onLoadedMetadata={() => console.log("Video metadata loaded")}
        onCanPlay={() => console.log("Video can play")}
        onError={(e) => console.error("Video error:", e)}
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div className="w-full max-w-xs space-y-4">
        {/* Upload Image Button */}
        <button 
          onClick={handleFileUpload}
          className="w-full bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-amber-400 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-camera text-lg"></i>
          Upload Image
        </button>

        {/* Stop Detection Button */}
        <button
          onClick={() => {
            stopCamera();
            setIsDetecting(false);
            setShowCamera(false);
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-stop text-lg"></i>
          Stop Detection
        </button>
      </div>
    </div>
  );
}