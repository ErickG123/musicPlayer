const musicPlayer = document.querySelector(".music_player");

const musicImage = document.querySelector(".music_image img");
const musicSinger = document.querySelector(".music_infos .music_singer");
const musicName = document.querySelector(".music_infos .music_title");

const mainAudio = document.querySelector("#main_audio");

const playPauseBtn = document.querySelector(".play_pause i");
const backwardBtn = document.querySelector("#backward");
const forwardBtn = document.querySelector("#forward");

const progressArea = document.querySelector(".progress_area");
const progressBar = document.querySelector(".progress_bar");

const shuffleBtn = document.querySelector("#shuffle");
const favoriteBtn = document.querySelector("#favorite");
const repeatBtn = document.querySelector("#repeat");

const buttons = document.querySelectorAll(".music_item_play_button");
let dataIdCell;

const images = document.querySelectorAll(".music_item_image img");
let dataIdImage;

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    updateDataIdCell(indexNumb);

    musicName.innerText = allMusic[indexNumb - 1].name;
    musicSinger.innerText = allMusic[indexNumb - 1].singer;
    musicImage.src = `./assets/images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `./assets/audio/${allMusic[indexNumb - 1].src}.mp3`;
}

function getPlaylistButtons(type) {
    buttons.forEach(button => {
        const buttonId = button.getAttribute("data-id");

        if (buttonId == dataIdCell) {
            if (type == "play") {
                button.classList.remove("fa-play");
                button.classList.add("fa-pause");
            } else {
                button.classList.remove("fa-pause");
                button.classList.add("fa-play");
            }
        }
    });
}

function getPlaylistImages(type) {
    images.forEach(image => {
        const imageId = image.getAttribute("data-image");

        if (imageId == musicIndex) {
            if (type == "play") {
                image.classList.add("music_playning");
            } else {
                image.classList.remove("music_playning");
            }
        } else {
            return false;
        }
    });
}

function playMusic() {
    musicPlayer.classList.add("paused");
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");

    getPlaylistButtons("play");
    getPlaylistImages("play");

    mainAudio.play();
}

function pauseMusic() {
    musicPlayer.classList.remove("paused");
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");

    getPlaylistButtons("pause");
    getPlaylistImages("pause");

    mainAudio.pause();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function updateDataIdCell(indexNumb) {
    dataIdCell = indexNumb;
    playPauseBtn.setAttribute("data-id-cell", indexNumb);
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = musicPlayer.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

forwardBtn.addEventListener("click", () => {
    nextMusic();
});

backwardBtn.addEventListener("click", () => {
    prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.querySelector(".current");
    let musicDuration = document.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
});

repeatBtn.addEventListener("click", () => {
    const isClicked = repeatBtn.classList.contains("repeat");

    if (!isClicked) {
        repeatBtn.style.color = "#181818";
        repeatBtn.classList.add("repeat");

        mainAudio.addEventListener("ended", () => {
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
        });
    } else {
        repeatBtn.style.color = "#ffffff";
        repeatBtn.classList.remove("repeat");
    }
});

shuffleBtn.addEventListener("click", () => {
    const isClicked = shuffleBtn.classList.contains("shuffle");

    if (!isClicked) {
        shuffleBtn.style.color = "#181818";
        shuffleBtn.classList.add("shuffle");

        mainAudio.addEventListener("ended", () => {
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);

            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
        })
    } else {
        shuffleBtn.style.color = "#ffffff";
        shuffleBtn.classList.remove("shuffle");
    }
});

favoriteBtn.addEventListener("click", () => {
    const isClicked = favoriteBtn.classList.contains("clicked");

    if (!isClicked) {
        favoriteBtn.style.color = "#ff508a";
        favoriteBtn.classList.add("clicked");
    } else {
        favoriteBtn.style.color = "#ffffff";
        favoriteBtn.classList.remove("clicked");
    }
});
