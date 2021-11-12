const canvas = document.getElementById("renderer")
const ctx = canvas.getContext("2d")

let analyser
let frequencyData
function startAudio() {
  const audio = new Audio()

  // get context
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  audio.src = "bird-whistling-a.wav"
  // audio.src = "sacred-song.mp3"

  analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaElementSource(audio)

  source.connect(analyser)
  analyser.connect(audioCtx.destination)

  // get array of frequency data
  frequencyData = new Uint8Array(analyser.frequencyBinCount)

  // start playing
  audio.play()
  requestAnimationFrame(render)
}

function render() {
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = canvas.width * 0.125

  analyser.getByteFrequencyData(frequencyData)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ringRenderer(frequencyData, ctx, centerX, centerY, radius)

  requestAnimationFrame(render)
}

function ringRenderer(frequencyData, ctx, centerX, centerY, radius) {
  const numberOfBars = frequencyData.length
  const maxBarLength = (canvas.width - radius) / 2
  const barStep = (2 * Math.PI) / numberOfBars

  ctx.beginPath()

  // draw circle
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = "#f00"
  ctx.stroke()

  // draw bars
  frequencyData.forEach((value, index) => {
    const barLength = (value / 256) * maxBarLength

    const x1 = centerX + radius * Math.cos(barStep * index)
    const y1 = centerY + radius * Math.sin(barStep * index)
    const x2 = centerX + (radius + barLength) * Math.cos(barStep * index)
    const y2 = centerY + (radius + barLength) * Math.sin(barStep * index)

    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
  })
  ctx.stroke()
}
