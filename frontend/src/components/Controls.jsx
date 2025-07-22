
// // "use client"
// // 4 props

// function Controls({isDetecting,onStart,onStop,disabled}){
//   return(
//     <div className="mt-6 space-y-4">

//     {!isDetecting ? (
//         <>
//       <button
//       onClick={onStart}
//       disabled={disabled}
//       className="w-full bg-amber-300 hover:bg-amber-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items justify-center gap-2"
      
//       >

//       {/* start detection icon */}

//       <i className="fa-solid fa-play text-lg"></i>       
//       {disabled ? "loading" : "start detection"}      
//       </button>

//       <button
//       onClick={onStop}
//       className="w-full justify-center items-center  bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex gap-2"
      
//       > 

//       {/* stop detection icon */}
//       <i className="fa-solid fa-stop text-lg"></i>
//       Stop Detection
//       </button>
//     </>

        
//     ): null}

//     {/* image button */}
    
//     <button className="w-full mt-4 bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-amber-400 transition-colors duration-300 gap-2">
//         <i className="fa-solid fa-camera text-lg"></i>
//         Upload Image
//     </button>
// </div>

//   )
// }

// export default Controls

"use client"

// Controls component - Handles start/stop detection buttons
function Controls({ isDetecting, onStart, onStop, disabled }) {
  return (
    <div className="mt-6">
      {!isDetecting ? (
        // Start Detection Button
        <button
          onClick={onStart}
          disabled={disabled}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {disabled ? "Loading..." : "Start Detection"}
        </button>
      ) : (
        // Stop Detection Button
        <button
          onClick={onStop}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0-6l-6 6" />
          </svg>
          Stop Detection
        </button>
      )}

      {/* Upload Image Button (Optional feature) */}
      <button className="w-full mt-4 bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-300">
        Upload Image
      </button>
    </div>
  )
}

export default Controls
