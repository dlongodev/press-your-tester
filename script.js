
const soundOn = document.querySelector("#on")
const soundOff = document.querySelector("#off")
themeSong = new Audio("sounds/theme-music.mp3")

// homepage theme song
soundOn.addEventListener("click", () => {
    themeSong.play()
    themeSong.volume = 0.4
    soundOff.classList.remove("hide")
    soundOn.classList.add("hide")
})

soundOff.addEventListener("click", () => {
    themeSong.pause()
    soundOn.classList.remove("hide")
    soundOff.classList.add("hide")
})