document.addEventListener('keypress', onKeyPress)

function onKeyPress(event) {
    const key = event.key
    const sound = 'clap'
    playSound(sound)
}


function playSound(sound) {
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0 
    audioTag.play()
}