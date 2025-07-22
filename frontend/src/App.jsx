 // control.jsx page - 

//  import React from 'react';
// import Controls from './components/Controls'; 
// import Hero from './components/Hero';

// const App = () => {
//   const handleStart = () => {
//     console.log('Start Detection Clicked');
//   };

//   const handleStop = () => {
//     console.log('Stop Detection Clicked');
//   };

//   return (
//     <div className="min-h-screen bg-yellow-400 text-white p-8">
//       <h1 className="text-2xl font-bold mb-6">Object Detection Controls</h1>
//       <Controls
//         isDetecting={false}
//         onStart={handleStart}
//         onStop={handleStop}
//         disabled={false}
//       />
//     </div>
//   );
// };
// export default App;


// hero.jsx page
// import React from 'react';
// import Hero from './components/Hero';
// import { randomSong , songsDatabase} from './data/songsDatabase';

// const App = () => {
//   const song = randomSong("happy");
// console.log(song);


//   return (
//     <div className="min-h-screen ">

//       <p className='text-lg'>Random Happy Song: {song}</p>
//       <Hero />
//     </div>
//   );
// };

// export default App;



// database of song page
// import React from 'react';
// import Hero from './components/Hero';
// import { songsDatabase, randomSong } from './data/songsDatabase';


// const App = () => {
//   const song = randomSong("disgusted");
//   console.log(song);

//   return (
//     <div className="min-h-screen bg-black text-white p-4">
//       <h1 className="text-2xl font-bold mb-4">Random Happy Song</h1>
      
//       {song ? (
//         <div>
//           <p>🎵 <strong>Title:</strong> {song.title}</p>
//           <p>👤 <strong>Artist:</strong> {song.artist}</p>
//           <p>📀 <strong>Album:</strong> {song.album}</p>
//           <p>🕒 <strong>Duration:</strong> {song.duration}</p>
//           <p>🔗 <a href={song.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Listen on Spotify</a></p>
//         </div>
//       ) : (
//         <p>No song found for that emotion.</p>
//       )}

//       <Hero />
//     </div>
//   );
// };

// export default App;


// demo page
// import React from 'react';
// import Demo from './components/Demo';

// const App = () => {
//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <Demo />
//     </div>
//   );
// };

// export default App;



// main component
// import React, { useState } from 'react';
// import Hero from './components/Hero';
// import Demo from './components/Demo';

// function App() {
//   const [currentPage, setCurrentPage] = useState('hero'); // 'hero' or 'demo'

//   const handleTryDemo = () => {
//     setCurrentPage('demo');
//   };

//   const handleBackToHome = () => {
//     setCurrentPage('hero');
//   };

//   return (
//     <div className="App">
//       {currentPage === 'hero' && (
//         <Hero onTryDemo={handleTryDemo} />
//       )}
//       {currentPage === 'demo' && (
//         <Demo onBackToHome={handleBackToHome} />
//       )}
//     </div>
//   );
// }

// export default App;

// explain.jsx page 

//  import React from 'react';
//  import Explain from './components/Explain';

//  const App = () => {
//    return (
//      <div className="h-full flex items-center justify-center">
//        <Explain />
//      </div>
//    );
//  };

//  export default App;

"use client"

import { useState } from "react"
import Hero from "./components/Hero"
import EmotionDetector from "./components/EmotionDetector"
import Explain from "./components/Explain"

function App() {
  const [currentPage, setCurrentPage] = useState("home") // "home", "demo", or "explain"

  // Navigation handlers
  const navigateToHome = () => setCurrentPage("home")
  const navigateToDemo = () => setCurrentPage("demo")
  const navigateToExplain = () => setCurrentPage("explain")

  // Render the appropriate page based on currentPage state
  return (
    <div className="min-h-screen">
      {currentPage === "home" && <Hero onTryDemo={navigateToDemo} onLearnMore={navigateToExplain} />}
      {currentPage === "demo" && <EmotionDetector onBackToHome={navigateToHome} />}
      {currentPage === "explain" && <Explain onBackToHome={navigateToHome} onTryDemo={navigateToDemo} />}
    </div>
  )
}

export default App
