export const songsDatabase= {
    happy:[
        { // 1st object
        id:1,
        title: "happy",
        artist: "Pharrell Williams",
        genre: "Pop",
        duration: "3:53",
        album: "Girl",
        year: 2013,
        spotifyUrl: "https://open.spotify.com/track/..."

        },  // 2nd object
        {
            id: 2,
      title: "Can't Stop the Feeling",
      artist: "Justin Timberlake",
      genre: "Pop",
      duration: "3:56",
      album: "Trolls Soundtrack",
      year: 2016,
      spotifyUrl: "https://open.spotify.com/track/..."

        }, 
        {
            id: 3,
      title: "Good as Hell",
      artist: "Lizzo",
      genre: "Pop/R&B",
      duration: "2:39",
      album: "Cuz I Love You",
      year: 2019,
      spotifyUrl: "https://open.spotify.com/track/..."
        },
    ],
    sad:[
        {
            id: 4,
      title: "Someone Like You",
      artist: "Adele",
      genre: "Ballad",
      duration: "4:45",
      album: "21",
      year: 2011,
      spotifyUrl: "https://open.spotify.com/track/..."

        },
        {
            id: 5,
      title: "Hurt",
      artist: "Johnny Cash",
      genre: "Country",
      duration: "3:38",
      album: "American IV",
      year: 2002,
      spotifyUrl: "https://open.spotify.com/track/..."

        },
        {
            id: 6,
      title: "Mad World",
      artist: "Gary Jules",
      genre: "Alternative",
      duration: "3:07",
      album: "Trading Snakeoil for Wolftickets",
      year: 2003,
      spotifyUrl: "https://open.spotify.com/track/..."
        },
    ],

    angry:[
        {
            id: 7,
      title: "Break Stuff",
      artist: "Limp Bizkit",
      genre: "Nu Metal",
      duration: "2:47",
      album: "Significant Other",
      year: 1999,
      spotifyUrl: "https://open.spotify.com/track/..."
        },
        {
            id: 8,
      title: "Bodies",
      artist: "Drowning Pool",
      genre: "Metal",
      duration: "3:23",
      album: "Sinner",
      year: 2001,
      spotifyUrl: "https://open.spotify.com/track/..."
        },
        
    ],

    surprised:[
        {
            id: 9,
      title: "Thunderstruck",
      artist: "AC/DC",
      genre: "Hard Rock",
      duration: "4:52",
      album: "The Razors Edge",
      year: 1990,
      spotifyUrl: "https://open.spotify.com/track/..."

        },
        {
            id: 10,
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      genre: "Funk/Pop",
      duration: "4:30",
      album: "Uptown Special",
      year: 2014,
      spotifyUrl: "https://open.spotify.com/track/..."

        },
    ],
    fearful:[
        {
            id: 11,
      title: "Breathe Me",
      artist: "Sia",
      genre: "Alternative",
      duration: "4:31",
      album: "Colour the Small One",
      year: 2004,
      spotifyUrl: "https://open.spotify.com/track/..."
        },
        {
            id: 12,
      title: "Heavy",
      artist: "Linkin Park ft. Kiiara",
      genre: "Alternative Rock",
      duration: "2:49",
      album: "One More Light",
      year: 2017,
      spotifyUrl: "https://open.spotify.com/track/..."
    
        },
    ],
    disgusted:[
        {
            
      id: 13,
      title: "Toxic",
      artist: "Britney Spears",
      genre: "Pop",
      duration: "3:19",
      album: "In the Zone",
      year: 2003,
      spotifyUrl: "https://open.spotify.com/track/..."

        },
        {
id: 14,
      title: "Bad Guy",
      artist: "Billie Eilish",
      genre: "Alternative Pop",
      duration: "3:14",
      album: "When We All Fall Asleep",
      year: 2019,
      spotifyUrl: "https://open.spotify.com/track/..."
        },
    ],
    neutral:[
        {
            id: 15,
      title: "Weightless",
      artist: "Marconi Union",
      genre: "Ambient",
      duration: "8:08",
      album: "Weightless",
      year: 2011,
      spotifyUrl: "https://open.spotify.com/track/..."

        },
        {
            id: 16,
      title: "Clair de Lune",
      artist: "Claude Debussy",
      genre: "Classical",
      duration: "4:42",
      album: "Suite Bergamasque",
      year: 1905,
      spotifyUrl: "https://open.spotify.com/track/..."
        },
    ],

}


// function to get random song

export const randomSong= (emotion)=>{
    const songs= songsDatabase[emotion] 
    if(!songs || songs.length===0){ // song.length= total number of songs
        return  null;
    }

    const randomIndex= Math.floor(Math.random() * songs.length)
    return songs[randomIndex]
}


export const getSongByEmotion = (emotion) =>{
    return songsDatabase[emotion] || []
}
