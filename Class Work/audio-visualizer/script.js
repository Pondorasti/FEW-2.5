const canvas = document.getElementById("renderer")
const ctx = canvas.getContext("2d")

let micAllowed = false
let isListening = false

let stream
let analyser
let audioSource
let frequencyData

let startTime
let timestamps = []

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
  analyser.fftSize = 1024

  audioSource = audioCtx.createMediaStreamSource(stream)

  audioSource.connect(analyser)
  analyser.connect(audioCtx.destination)

  // get array of frequency data
  frequencyData = new Uint8Array(analyser.frequencyBinCount)

  requestAnimationFrame(render)
}

function render(timestamp) {
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = canvas.width * 0.25

  if (startTime == null) {
    startTime = timestamp
  }
  const deltaTime = timestamp - startTime

  analyser.getByteFrequencyData(frequencyData)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  canvasRenderer(frequencyData, ctx, centerX, centerY, radius, deltaTime)

  requestAnimationFrame(render)
}

function canvasRenderer(frequencyData, ctx, centerX, centerY, radius, deltaTime) {
  // Outer Rings
  const barWidth = 2.5
  const barHeight = 2.5

  ctx.lineWidth = barWidth

  const numberOfBars = frequencyData.length / 2
  const barStep = (2 * Math.PI) / numberOfBars

  ctx.beginPath()

  for (let index = 0; index < numberOfBars; index += 1) {
    const value = frequencyData[index]
    const adjustedValue = value / 3
    const amplitude = (adjustedValue + barHeight) / 2

    const x1 = centerX + (radius - amplitude) * Math.cos(barStep * index)
    const y1 = centerY + (radius - amplitude) * Math.sin(barStep * index)
    const x2 = centerX + (radius + amplitude) * Math.cos(barStep * index)
    const y2 = centerY + (radius + amplitude) * Math.sin(barStep * index)

    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
  }

  ctx.stroke()

  // Needle
  const secondsInterval = 30000
  const normalizedTime = deltaTime % secondsInterval
  const needleStep = (2 * Math.PI) / secondsInterval

  const decibelLevel = getDecibelLevel(frequencyData)
  const maxDecibelLevel = 50
  const normalizedDecibelLevel = Math.min(decibelLevel / maxDecibelLevel, 1)
  const needleTopMargin = 20
  const needleHeight = radius * normalizedDecibelLevel - needleTopMargin

  const x = centerX + needleHeight * Math.cos(needleStep * normalizedTime)
  const y = centerY + needleHeight * Math.sin(needleStep * normalizedTime)

  ctx.moveTo(centerX, centerY)
  ctx.lineTo(x, y)
  ctx.stroke()

  // Radar Graph
  // timestamps.push({ deltaTime, decibelLevel })
  // const lastIndex = timestamps.length - 1
  // while (timestamps[lastIndex].deltaTime - timestamps[0].deltaTime > secondsInterval) {
  //   timestamps.shift()
  // }
  // timestamps.forEach((timestamp, index) => {
  //   const normalizedIndex = index / timestamps.length
  //   const x = centerX + radius * Math.cos(needleStep * timestamp.deltaTime)
  //   const y = centerY + radius * Math.sin(needleStep * timestamp.deltaTime)
  //   ctx.fillRect(x, y, 1, 1)
  // })
}

// Source: https://github.com/apm1467/html5-mic-visualizer/blob/bb146b117f1bf8c5b0850cb3db942b6d3ae8d209/js/index.js#L54-L62
// Explanation: https://stackoverflow.com/a/38983553/7897036
function getDecibelLevel(frequencyData) {
  let total = 0
  frequencyData.forEach((value) => {
    total += value * value
  })

  const rms = Math.sqrt(total / frequencyData.length)
  const decibel = 20 * Math.log10(rms)

  return Math.max(decibel, 0) // sanity check
}
