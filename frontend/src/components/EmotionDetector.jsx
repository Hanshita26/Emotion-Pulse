"use client"

import { useRef, useEffect, useState } from "react"
import * as faceapi from "face-api.js"
import MusicPlayer from "./MusicPlayer"
import { getSongByEmotion } from "../data/songsDatabase"

function EmotionDetector({ onBackToHome }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const [isDetecting, setIsDetecting] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stream, setStream] = useState(null)
  const [songs, setSongs] = useState([])
  const [detectionInterval, setDetectionInterval] = useState(null)

  // Load models when component mounts
  useEffect(() => {
    loadModels()
    return () => {
      stopCamera()
      if (detectionInterval) {
        clearInterval(detectionInterval)
      }
    }
  }, [])

  // Update songs when emotion changes
  useEffect(() => {
    if (currentEmotion) {
      const emotionSongs = getSongByEmotion(currentEmotion)
      setSongs(emotionSongs || [])
      console.log("🎵 Songs for", currentEmotion, ":", emotionSongs)
    }
  }, [currentEmotion])

  // Function to load face-api.js models
  const loadModels = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log("Starting to load ML models...")

      console.log("Loading tiny face detector...")
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      console.log("✓ Tiny face detector loaded")

      console.log("Loading face landmarks...")
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models")
      console.log("✓ Face landmarks loaded")

      console.log("Loading face expressions...")
      await faceapi.nets.faceExpressionNet.loadFromUri("/models")
      console.log("✓ Face expressions loaded")

      console.log("🎉 All models loaded successfully!")
      setIsLoading(false)
    } catch (err) {
      console.error("❌ Error loading models:", err)
      setError(`Failed to load AI models: ${err.message}`)
      setIsLoading(false)
    }
  }

  // Start camera
  const startCamera = async () => {
    try {
      setError(null)
      console.log("🎥 Requesting camera access...")

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      })

      console.log("✓ Camera stream obtained")
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream

        // Wait for video to be ready and start detection
        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            .play()
            .then(() => {
              console.log("✓ Video is playing")
              // Start detection after a short delay to ensure video is ready
              setTimeout(() => {
                startDetectionLoop()
              }, 1000)
            })
            .catch((err) => {
              console.error("❌ Error playing video:", err)
              setError("Error playing video: " + err.message)
            })
        }
      }

      return true
    } catch (err) {
      console.error("❌ Camera error:", err)
      if (err.name === "NotAllowedError") {
        setError("Camera permission denied. Please allow camera access.")
      } else {
        setError("Camera error: " + err.message)
      }
      return false
    }
  }

  // Start detection loop
  const startDetectionLoop = () => {
    if (detectionInterval) {
      clearInterval(detectionInterval)
    }

    console.log("🚀 Starting detection loop...")
    setIsDetecting(true)

    // Start detecting immediately
    detectEmotions()

    const interval = setInterval(() => {
      console.log("🔄 Running detection cycle...")
      detectEmotions()
    }, 2000) // Check every 2 seconds

    setDetectionInterval(interval)
  }

  // Start detection
  const startDetection = async () => {
    if (isLoading) {
      setError("Models are still loading. Please wait...")
      return
    }

    console.log("🚀 Starting detection...")
    await startCamera()
  }

  // Stop camera and detection
  const stopCamera = () => {
    console.log("🛑 Stopping camera and detection...")
    setIsDetecting(false)

    if (detectionInterval) {
      clearInterval(detectionInterval)
      setDetectionInterval(null)
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setCurrentEmotion(null)
  }

  // Main emotion detection function - COMPLETELY FIXED VERSION
  const detectEmotions = async () => {
    try {
      // Check if everything is ready
      if (!videoRef.current) {
        console.log("⚠️ Video element not found")
        return
      }

      // Don't check isDetecting here - it causes the loop to stop!
      // if (!isDetecting) {
      //   console.log("⚠️ Detection is stopped")
      //   return
      // }

      // Check if video is actually playing
      if (videoRef.current.paused || videoRef.current.ended) {
        console.log("⚠️ Video is paused or ended")
        return
      }

      // Check video dimensions
      if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
        console.log("⚠️ Video dimensions not ready")
        return
      }

      console.log("🔍 Detecting emotions...")

      // Create detection options
      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.5,
      })

      // Detect faces and expressions
      const detections = await faceapi.detectAllFaces(videoRef.current, options).withFaceExpressions()

      console.log("📊 Detection results:", detections)

      if (detections && detections.length > 0) {
        const detection = detections[0]
        const expressions = detection.expressions

        console.log("😊 Expressions found:", expressions)

        // Find the emotion with highest confidence
        let maxEmotion = "neutral"
        let maxConfidence = 0

        Object.keys(expressions).forEach((emotion) => {
          console.log(`${emotion}: ${(expressions[emotion] * 100).toFixed(1)}%`)
          if (expressions[emotion] > maxConfidence) {
            maxConfidence = expressions[emotion]
            maxEmotion = emotion
          }
        })

        console.log(`🎯 Strongest emotion: ${maxEmotion} (${(maxConfidence * 100).toFixed(1)}% confidence)`)

        // Update emotion if confidence is reasonable (lowered threshold for testing)
        if (maxConfidence > 0.2) {
          console.log(`✅ Setting emotion to: ${maxEmotion}`)
          setCurrentEmotion(maxEmotion)
        } else {
          console.log(`⚠️ Confidence too low: ${(maxConfidence * 100).toFixed(1)}%`)
        }
      } else {
        console.log("👤 No face detected in this frame")
      }
    } catch (err) {
      console.error("❌ Detection error:", err)
      console.error("Error details:", err.message)
    }
  }

  // Get emoji for emotion
  const getEmotionEmoji = (emotion) => {
    const emojis = {
      happy: "😊",
      sad: "😢",
      angry: "😠",
      surprised: "😲",
      fearful: "😨",
      disgusted: "🤢",
      neutral: "😐",
    }
    return emojis[emotion] || "😐"
  }

  // If emotion detected, show results
  if (currentEmotion) {
    return (
      <div className="min-h-screen bg-yellow-300 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button onClick={onBackToHome} className="text-gray-800 hover:text-gray-600">
              ← Back to Home
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Emotion Detected!</h1>
            <div></div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 text-center">
            <div className="text-8xl mb-4">{getEmotionEmoji(currentEmotion)}</div>
            <h2 className="text-3xl font-bold text-gray-800 capitalize mb-2">You're feeling {currentEmotion}!</h2>
            <p className="text-gray-600">Here's some music that matches your mood</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MusicPlayer currentEmotion={currentEmotion} songs={songs} />

            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Try Again?</h3>
              <button
                onClick={() => {
                  setCurrentEmotion(null)
                  startDetection()
                }}
                className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-lg"
              >
                Detect Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main detection interface
  return (
    <div className="min-h-screen bg-yellow-300 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBackToHome} className="text-gray-800 hover:text-gray-600">
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-800">EmotionPulse Demo</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera section */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Camera</h2>

            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading AI models...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
            )}

            {/* Camera feed */}
            {!isLoading && (
              <div className="relative mb-4">
                <video
                  ref={videoRef}
                  className="w-full h-64 bg-black rounded-lg object-cover"
                  muted
                  playsInline
                  autoPlay
                />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-64 rounded-lg pointer-events-none" />

                {/* Show current emotion if detecting */}
                {isDetecting && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded">
                    🔍 Detecting...
                  </div>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="space-y-3">
              {!isDetecting ? (
                <button
                  onClick={startDetection}
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg"
                >
                  {isLoading ? "Loading..." : "Start Detection"}
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg"
                >
                  Stop Detection
                </button>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-amber-400 rounded-full p-2 mr-3 mt-1">
                  <span className="text-white">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Try Different Expressions</h3>
                  <p className="text-gray-600">Smile, frown, look surprised, or show other clear emotions</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-400 rounded-full p-2 mr-3 mt-1">
                  <span className="text-white">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Good Lighting</h3>
                  <p className="text-gray-600">Make sure your face is well-lit and clearly visible</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-400 rounded-full p-2 mr-3 mt-1">
                  <span className="text-white">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Be Patient</h3>
                  <p className="text-gray-600">Detection runs every 2 seconds - hold your expression</p>
                </div>
              </div>
            </div>

            {/* Debug info */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold mb-2">Status:</h4>
              <p className="text-sm text-gray-600">
                Models: {isLoading ? "Loading..." : "✓ Ready"}
                <br />
                Camera: {stream ? "✓ Active" : "Not started"}
                <br />
                Detection: {isDetecting ? "✓ Running" : "Stopped"}
                <br />
                Current emotion: {currentEmotion || "None detected yet"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmotionDetector
