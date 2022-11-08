var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 15,
    loop: true,
    autoplay: {
        delay: 2555500,
        disableOnInteraction: false,
    }
});

function updatePlayButtonPlaylistPlay(button) {
    button.classList.add("paused");
    button.classList.remove("fa-play");
    button.classList.add("fa-pause");

    getPlaylistImages("play");
}

function updatePauseButtonPlaylistPause(button) {
    button.classList.remove("paused");
    button.classList.remove("fa-pause");
    button.classList.add("fa-play");

    getPlaylistImages("pause");
}

function playMusicInPlaylist(button) {
    updatePlayButtonPlaylistPlay(button);
    playMusic();
}

function pauseMusicInPlaylist(button) {
    updatePauseButtonPlaylistPause(button);
    pauseMusic();
}

function checkMusicIndex(dataId) {
    return dataId == musicIndex ? true : false
}

function updatePlaylist(musicPlayning) {
    buttons.forEach(button => {
        const buttonId = button.getAttribute("data-id");

        if (buttonId == musicPlayning) {
            updatePlayButtonPlaylistPlay(button);
        } else {
            updatePauseButtonPlaylistPause(button);
        }
    });
}

function startMusic(button, dataId) {
    const isEqual = checkMusicIndex(dataId);

    let isMusicPaused = button.classList.contains("paused");

    if (isEqual) {
        isMusicPaused ? pauseMusicInPlaylist(button) : playMusicInPlaylist(button);
    } else {
        musicIndex = dataId;
        loadMusic(musicIndex);
        isMusicPaused ? pauseMusicInPlaylist(button) : playMusicInPlaylist(button);
    }
}

mainAudio.addEventListener("ended", () => {
    if (musicIndex < allMusic.length) {
        musicIndex++;
    } else {
        musicIndex = 1;
    }

    updatePlaylist(musicIndex);
    loadMusic(musicIndex);
    playMusic();
});

buttons.forEach(button => {
    const dataId = button.getAttribute("data-id");

    button.addEventListener("click", () => {
        startMusic(button, dataId);
    });
});
