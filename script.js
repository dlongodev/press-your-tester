
const soundOn = document.querySelector("#on")
const soundOff = document.querySelector("#off")
themeSong = new Audio("sounds/theme-music.mp3")

function autoPlay() {
    themeSong.play(); //play the audio file
    themeSong.volume = 0.4
}

// homepage theme song
soundOn.addEventListener("click", () => {
    themeSong.pause()
    soundOff.classList.remove("hide")
    soundOn.classList.add("hide")
})

soundOff.addEventListener("click", () => {
    themeSong.play()
    themeSong.volume = 0.4
    soundOn.classList.remove("hide")
    soundOff.classList.add("hide")
})