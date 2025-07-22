"use client"

const Explain = ({ onBackToHome, onTryDemo }) => {
  return (
    <div className="w-screen min-h-screen relative flex flex-col items-center justify-center bg-amber-200">
      {/* Back button */} 
      <button
        onClick={onBackToHome}
        className="absolute top-4 left-4 flex items-center px-4 py-2 bg-white/20 border border-white/30 text-gray-800 rounded-lg hover:bg-white/30 transition-colors"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i>
        Back to Home
      </button>

      <h1 className="text-6xl font-bold flex flex-col items-center justify-center mb-5 mt-5">How it works</h1>
      <div className="h-[400px] w-[600px] bg-white items-center justify-center rounded-2xl text-black mt-2">
        <p className="pt-5 pr-3 pl-3">
          <b>Emotion Pulse</b> is an AI-powered web application that analyzes your facial expressions in real-time and
          recommends music that perfectly matches your current emotional state.
        </p>
        <p className="pt-5 pr-3 pl-3">
          Using advanced computer vision and machine learning algorithms, our system can detect emotions like happiness,
          sadness, anger, surprise, and more from your camera feed or uploaded images.
        </p>
        <p className="pt-5 pr-3 pl-3">
          Once your emotion is detected, our smart recommendation engine suggests the perfect playlist to enhance or
          balance your mood, creating a personalized musical experience.
        </p>
      </div>
      <div className="items-center justify-center mt-10">
        {/*diff cards */}
        <div className="h-[120px] w-[600px] flex flex-col justify-center items-center bg-amber-300 rounded-2xl space-y-2 mt-4">
          <span>
            <i className="fa-solid fa-face-smile"></i>
          </span>
          <h3 className="text-black">Emotion Detection</h3>
          <p>Real-time facial expression analysis using AI</p>
        </div>
        <div className="h-[120px] w-[600px] flex flex-col justify-center items-center bg-amber-300 rounded-2xl space-y-2 mt-4">
          <span>
            <i className="fa-solid fa-music"></i>
          </span>
          <h3 className="text-black">Smart Recommendations</h3>
          <p>Personalized music suggestions based on your mood</p>
        </div>
        <div className="h-[120px] w-[600px] flex flex-col justify-center items-center bg-amber-300 rounded-2xl space-y-2 mt-4">
          <span>
            <i className="fa-solid fa-tablet"></i>
          </span>
          <h3 className="text-black">Easy to use</h3>
          <p>Simple interface with camera or image upload options</p>
        </div>
      </div>
      <div className="items-center justify-center mt-10 flex flex-row mb-5 gap-8">
        <div className="h-[210px] w-[600px] bg-yellow-100 text-black rounded-2xl space-y-2 flex flex-col justify-center items-center px-3">
          <h3>View Source Code</h3>
          <p>This project is open source! Check out the complete code and documentation on GitHub.</p>
          <button
            onClick={() => window.open("https://github.com/Hanshita26/Emotion-Pulse", "_blank")}
            className="h-[70px] w-[220px] bg-black text-white rounded-3xl cursor-pointer flex justify-between items-center px-4"
          >
            <i className="fa-brands fa-github"></i>
            <p>View on Github</p>
          </button>
        </div>
        <div className="h-[70px] w-[220px] bg-amber-100 rounded-2xl flex justify-center items-center cursor-pointer p-4">
          <button onClick={onTryDemo}>Try the Demo</button>
        </div>
      </div>
    </div>
  )
}

export default Explain
