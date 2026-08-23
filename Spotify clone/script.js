let currentsong = new Audio();
let songs;

// 🕒 Time Formatter Helper Function
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

// 🎵 Function 1: Fetch Songs Array based on Playlist Name
async function getsongs(playlistName) {
    if (playlistName === "saiyaara") {
        return [
            "Barbaad.mp3",
            "Barbaad(female).mp3",
            "Tum Ho Toh Song.mp3",
            "Hum safar .mp3"
        ];
    } 
    else if (playlistName === "kishore kumar"){
        return[
            "Meri Bheegi Bheegi si.mp3",
            "Zindigi ek safar.mp3",
            "Chala Jata hoon.mp3"

        ];
    }
    else if (playlistName === "English song") {
return [
    "Centra Cee (English).mp3",
    "CKay (English).mp3",
    "The Hanging Tree  (English).mp3"
];
    }
    else if (playlistName === "Funk song") {
return [
    "CUTE DEPRESSED(Funk).mp3",
    "DON`T STOP(Funk).mp3",
    "Glacitao(Funk).mp3"
    
];
    }
    else {
        // Default Playlist
        return [
            "Barbaad.mp3",
            "Barf si.mp3"
            
        ];
    }
}


// 🔊 Function 2: Play or Load Song (With Active Highlight)
const playMusic = (track, pause = false) => {
    currentsong.src = track;

    if (!pause) {
        currentsong.play();
        play.src = "pause.svg";
    } else {
        play.src = "play.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

    // 🟢 Active Song Highlight Logic (Sidebar)
    let allSongs = document.querySelector(".songList").getElementsByTagName("li");
    
    // 1. Sabse pehle saare gaano se highlight hatao
    Array.from(allSongs).forEach(e => {
        e.classList.remove("active-song");
        e.querySelector(".playnow img").src = "play.svg"; // Icon reset
    });

    // 2. Jo gaana baj raha hai, uspar highlight lagao
    Array.from(allSongs).forEach(e => {
        if (e.querySelector(".info").firstElementChild.innerHTML.trim() === decodeURI(track)) {
            e.classList.add("active-song");
            if(!pause){
                 e.querySelector(".playnow img").src = "pause.svg"; // Sidebar mein bhi pause icon dikhe
            }
        }
    });
}
// 📂 Function 3: Albums/Folders ka Data (Mini Database)
const albumsData = [
    
    
    {
        folder: "saiyaara",
        title: "Saiyaara",
        desc: "July • 7min",
        image: "Saiyaara.jpg"
    },
    {
        folder: "kishore kumar",
        title: "Kishore kumar",
        desc: "All TIME HITS",
        image: "kishore kumar.jpg"
    },
    {
        folder: "English song",
        title: "English Songs",
        desc: "Feel Vibe from  disunderstanding song",
        image: "English.jpg"
    },
    
    {
        folder: "Funk song",
        title: "Funk SONGS",
        desc: "feel the Vibe",
        image: "Funk song.jpg"
    }
    
];

// 🎨 Function 4: Generate Cards Dynamically
function displayAlbums() {
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = ""; // Pehle purana saaf karo

    // Har album ke liye card banao
    albumsData.forEach(album => {
        cardContainer.innerHTML += `
            <div data-playlist="${album.folder}" class="card rounded">
                <div class="card-img-container">
                    <img src="${album.image}" alt="${album.title}">
                    <div class="play-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
                        </svg>
                    </div>
                </div>
                <h2>${album.title}</h2>
                <p>${album.desc}</p>
            </div>
        `;
    });

    // 🎧 Naye Cards par Click Listener Lagao
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            let playlistName = item.currentTarget.dataset.playlist;
            console.log("Loading playlist: ", playlistName);

            // Naye gaane fetch karo
            songs = await getsongs(playlistName);

            // Sidebar update karo
            let songul = document.querySelector(".songList").getElementsByTagName("ul")[0];
            songul.innerHTML = "";

            for (const song of songs) {
                songul.innerHTML += `<li>  
                    <img class="invert" src="music.svg" alt="play song">
                    <div class="info">
                        <div>${song.replaceAll("%20", " ")}</div>
                        <div>Rishi</div>
                    </div>
                    <div class="playnow">
                        <span>Play now</span>
                        <img class="invert playimg" src="play.svg" alt="play">
                    </div> 
                </li>`;
            }

            // Naye gaano par click listener lagao
            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                e.addEventListener("click", () => {
                    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
                });
            });

            // Pehla gaana automatically play kar do
            if (songs.length > 0) {
                playMusic(songs[0]);
            }
        });
    });
}

// 🚀 Function 5: Main App Controller
async function main() {
    songs = await getsongs("default");

    // Pehle gaane ko seekbar par load karo
    if (songs.length > 0) {
        playMusic(songs[0], true);
    }

    // 👇 Yahan displayAlbums ko call kiya gaya hai 👇
    displayAlbums();

    // Sidebar Library List Render (Initial Load Ke Liye)
    let songul = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songul.innerHTML = "";

    for (const song of songs) {
        songul.innerHTML += `<li>  
            <img class="invert" src="music.svg" alt="play song">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Rishi</div>
            </div>
            <div class="playnow">
                <span>Play now</span>
                <img class="invert playimg" src="play.svg" alt="play">
            </div> 
        </li>`;
    }

    // Initial Library Ke Har Song Par Click Listener
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    // Play/Pause Control Button Click Listener
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg";
        } else {
            currentsong.pause();
            play.src = "play.svg";
        }
    });

    // 🟢 Listen for timeupdate event (Timer + Seekbar Circle Animation)
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    });

    // 🎯 Seekbar Click Event
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    });

    // 🍔 Hamburger Click Listener (Smooth Sidebar Push)
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".container").classList.add("sidebar-active");
    });

    // ✖️ Close Click Listener (Sidebar Close)
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".container").classList.remove("sidebar-active");
    });

    // ⏪ Previous button
    previous.addEventListener("click", () => {
        let currentFileName = decodeURI(currentsong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFileName);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    // ⏩ Next button
    next.addEventListener("click", () => {
        let currentFileName = decodeURI(currentsong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFileName);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    // 🔊 Volume Slider Event Listener
    document.querySelector(".range input").addEventListener("change", (e) => {
        let volValue = parseInt(e.target.value);
        currentsong.volume = volValue / 100;

        if (volValue === 0) {
            document.querySelector(".volume img").src = "mute.svg";
        } else {
            document.querySelector(".volume img").src = "volume.svg";
        }
    });

    // 🔇 Mute/Unmute Icon Click Event
    document.querySelector(".volume img").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = "mute.svg";
            currentsong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = "volume.svg";
            currentsong.volume = 0.5;
            document.querySelector(".range input").value = 50;
        }
    });

    // 🎧 Auto-Play Next Song (Jab gaana khatam ho jaye)
    currentsong.addEventListener("ended", () => {
        let currentFileName = decodeURI(currentsong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(currentFileName);
        
        // Agar array mein agla gaana bacha hai, toh use play kar do
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });
    
}

main();