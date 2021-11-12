const canvas = document.getElementById("renderer")
const ctx = canvas.getContext("2d")

let micAllowed = false
let isListening = false

let stream
let analyser
let frequencyData

async function requestStartAudio() {
  if (!micAllowed) {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      isListening = true
      startAudio()
    } catch (err) {
      alert("Microphone permissions denied!")
    }
  } else if (isListening) {
    isListening = false
    // TODO: stop
  } else if (!isListening) {
    isListening = true
    startAudio()
  }
}

function startAudio() {
  const audio = new Audio()

  // get context
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  // create analyser
  analyser = audioCtx.createAnalyser()
  analyser.fftSize = 256

  // create audio source
  // audio.src = "bird-whistling-a.wav"
  // audio.src = "sacred-song.mp3"
  // const source = audioCtx.createMediaElementSource(audio)
  const source = audioCtx.createMediaStreamSource(stream)

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
  const radius = canvas.width * 0.25

  analyser.getByteFrequencyData(frequencyData)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ringRenderer(frequencyData, ctx, centerX, centerY, radius)

  requestAnimationFrame(render)
}

function ringRenderer(frequencyData, ctx, centerX, centerY, radius) {
  const barWidth = 2.5
  const barHeight = 2.5

  ctx.lineWidth = barWidth

  const numberOfBars = frequencyData.length
  const barStep = (2 * Math.PI) / numberOfBars
  const freqStep = Math.floor(frequencyData.length / numberOfBars)

  ctx.beginPath()

  for (let index = 0; index < frequencyData.length; index += freqStep) {
    const amplitude = (frequencyData[index] / 6 + barHeight) / 2

    const x1 = centerX + (radius - amplitude) * Math.cos(barStep * index)
    const y1 = centerY + (radius - amplitude) * Math.sin(barStep * index)
    const x2 = centerX + (radius + amplitude) * Math.cos(barStep * index)
    const y2 = centerY + (radius + amplitude) * Math.sin(barStep * index)

    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
  }

  ctx.stroke()
}
