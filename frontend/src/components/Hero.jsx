// import React from "react"
// import happy_emoji from "../assets/emotions/happy_emoji.png"

// function Hero({ onTryDemo }) {  // Add onTryDemo prop
//   const handleTryDemo = () => {
//     // Call the parent function to navigate to Demo
//     if (onTryDemo) {
//       onTryDemo();
//     } else {
//       // Fallback to URL redirect if no prop provided
//       window.location.href = "/demo";
//     }
//   }

//   return (
//     <div className="min-h-screen bg-yellow-300 flex items-center justify-center w-full">
//       <div className="text-center w-full mx-auto">
//         {/* Main Heading */}
//         <h1 className="font-bold text-5xl text-gray-900 mb-5">
//           Music that matches your mood!
//         </h1>
        
//         {/* Subheading */}
//         <p className="font-medium text-xl text-gray-700 mb-10">
//           Emotion Pulse uses AI to analyze your facial expressions and recommend music that perfectly matches your
//           emotional state.
//         </p>
        
//         {/* Buttons */}
//         <div className='flex items-center justify-evenly mb-10'>
//           <button 
//             onClick={handleTryDemo}  // Updated onClick handler
//             className='text-amber-50 rounded-2xl font-medium px-8 py-3 bg-amber-400 transition-all duration-200 hover:bg-amber-200 transform cursor-pointer hover:scale-105'
//           >
//             Try Demo
//           </button>
//           <button className='text-amber-50 rounded-2xl font-medium bg-amber-400 px-8 py-3 duration-200 transform transition-all hover:bg-amber-200 cursor-pointer hover:scale-105'>
//             Learn How it works
//           </button>
//         </div>
        
//         {/* Separator */}
//         <div className="border-white border-t-2 border-dashed w-full my-6"></div>
        
//         {/* Animated circular design */}
//         <div className="relative mb-12">
//           <div className="w-60 h-60 mx-auto relative">
//             {/* Outer Orbit */}
//             <div className="absolute inset-0 border-4 border-dashed border-yellow-600 rounded-full animate-spin"></div>
//             {/* Middle Circle */}
//             <div className="absolute inset-4 border-3 border-dotted border-yellow-500 rounded-full animate-pulse"></div>
//             {/* Inner Circle with Emoji */}
//             <div className="absolute inset-8 bg-yellow-400 bg-opacity-40 rounded-full flex items-center justify-center overflow-hidden">
//               <img
//                 src={happy_emoji || "/placeholder.svg"}
//                 alt="happy emoji"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   objectFit: "cover",
//                 }}
//                 className="rounded-full"
//               />
//             </div>
//             {/* Floating Dots */}
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-bounce"></div>
//             <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 bg-yellow-200 rounded-full animate-bounce"></div>
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce"></div>
//             <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 bg-yellow-200 rounded-full animate-bounce"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Hero

"use client"

import happy_emoji from "../assets/emotions/happy_emoji.png"

function Hero({ onTryDemo, onLearnMore }) {
  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center w-full">
      <div className="text-center w-full mx-auto">
        {/* Main Heading */}
        <h1 className="font-bold text-5xl text-gray-900 mb-5">Music that matches your mood!</h1>

        {/* Subheading */}
        <p className="font-medium text-xl text-gray-700 mb-10">
          Emotion Pulse uses AI to analyze your facial expressions and recommend music that perfectly matches your
          emotional state.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-evenly mb-10">
          <button
            onClick={onTryDemo}
            className="text-amber-50 rounded-2xl font-medium px-8 py-3 bg-amber-400 transition-all duration-200 hover:bg-amber-200 transform cursor-pointer hover:scale-105"
          >
            Try Demo
          </button>
          <button
            onClick={onLearnMore}
            className="text-amber-50 rounded-2xl font-medium bg-amber-400 px-8 py-3 duration-200 transform transition-all hover:bg-amber-200 cursor-pointer hover:scale-105"
          >
            Learn How it works
          </button>
        </div>

        {/* Separator */}
        <div className="border-white border-t-2 border-dashed w-full my-6"></div>

        {/* Animated circular design */}
        <div className="relative mb-12">
          <div className="w-60 h-60 mx-auto relative">
            {/* Outer Orbit */}
            <div className="absolute inset-0 border-4 border-dashed border-yellow-600 rounded-full animate-spin"></div>
            {/* Middle Circle */}
            <div className="absolute inset-4 border-3 border-dotted border-yellow-500 rounded-full animate-pulse"></div>
            {/* Inner Circle with Emoji */}
            <div className="absolute inset-8 bg-yellow-400 bg-opacity-40 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={happy_emoji || "/placeholder.svg"}
                alt="happy emoji"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
                className="rounded-full"
              />
            </div>
            {/* Floating Dots */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-2 bg-yellow-200 rounded-full animate-bounce"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 bg-yellow-200 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
