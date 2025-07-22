"use client"

import { useState, useEffect } from "react"

function MusicPlayer({ currentEmotion, songs = [] }) {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30) 

  // random song when emotion changes
  useEffect(() => {
    if (songs && songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length)
      setCurrentSong(songs[randomIndex])
    }
  }, [currentEmotion, songs])


  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          return newProgress > 100 ? 0 : newProgress
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])


  const getEmotionIcon = (emotion) => {
    const emotionIcons = {
      happy: "fa-face-smile",
      sad: "fa-face-sad-tear",
      angry: "fa-face-angry",
      surprised: "fa-face-surprise",
      fearful: "fa-face-fearful",
      disgusted: "fa-face-dizzy",
      neutral: "fa-face-meh",
    }
    return emotionIcons[emotion] || "fa-face-meh"
  }

  if (!currentEmotion || !currentSong) {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 h-full">
        <h2 className="text-2xl font-bold text-white mb-4">Music Recommendation</h2>
        <div className="flex flex-col items-center justify-center h-64">
          <i className="fa-solid fa-music text-4xl text-white mb-4"></i>
          <p className="text-white text-center">Start detection to get music recommendations based on your emotion</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Music Recommendation</h2>

      {/* Current song display */}
      <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-lg font-semibold text-white">{currentSong.title}</h4>
            <p className="text-amber-200">{currentSong.artist}</p>
            <span className="text-sm text-amber-300">{currentSong.genre}</span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-amber-400 hover:bg-amber-500 text-white p-3 rounded-full transition-colors"
          >
            <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Song details */}
        <div className="flex justify-between text-xs text-amber-200 mt-1">
          <span>
            {Math.floor(
              (progress * Number.parseInt(currentSong.duration.split(":")[0]) * 60) / 100 +
                (progress * Number.parseInt(currentSong.duration.split(":")[1])) / 100,
            )}
            s
          </span>
          <span>{currentSong.duration}</span>
        </div>
      </div>

      {/* Playlist */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
          <i className={`fa-solid ${getEmotionIcon(currentEmotion)} mr-2`}></i>
          {currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)} Playlist
        </h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {songs.map((song) => (
            <div
              key={song.id}
              className={`flex items-center justify-between p-3 rounded-lg hover:bg-black hover:bg-opacity-30 transition-all cursor-pointer ${
                currentSong && currentSong.id === song.id ? "bg-black bg-opacity-30" : "bg-black bg-opacity-20"
              }`}
              onClick={() => {
                setCurrentSong(song)
                setIsPlaying(true)
              }}
            >
              <div className="flex items-center">
                {currentSong && currentSong.id === song.id && isPlaying ? (
                  <i className="fa-solid fa-volume-high text-amber-400 mr-3"></i>
                ) : (
                  <i className="fa-solid fa-music text-white mr-3"></i>
                )}
                <div>
                  <p className="text-white font-medium">{song.title}</p>
                  <p className="text-amber-200 text-sm">{song.artist}</p>
                </div>
              </div>
              <span className="text-amber-300 text-xs">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
