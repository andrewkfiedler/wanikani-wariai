import "./index.scss"

const dates = {
  sessionStart: Date.now(),
  lastAnswer: Date.now()
}

const isReady = () => {
  return document.querySelector("#stats") !== undefined
}

let lastCompletedCount = 0

const getCompletedCount = () => {
  const completedCount = parseInt(
    document.querySelector("#completed-count").innerHTML
  )
  if (completedCount !== lastCompletedCount) {
    lastCompletedCount = completedCount
    dates.lastAnswer = Date.now()
  }
  return completedCount
}

const getAvailableCount = () => {
  return parseInt(document.querySelector("#available-count").innerHTML)
}

const stopWatchElement = document.createElement("div")
stopWatchElement.style.display = "inline"
stopWatchElement.innerHTML = `
    <i class="icon-time" /> 
    <div id="wariai-stopwatch"></div>
  `

const timePerAnswerElement = document.createElement("div")
timePerAnswerElement.style.display = "inline"
timePerAnswerElement.innerHTML = `
  <i class="icon-dashboard" /> 
    <div id="wariai-rate"></div>
  `

const finishElement = document.createElement("div")
finishElement.style.display = "inline"
finishElement.innerHTML = `
  <i class="icon-sun" /> 
    <div id="wariai-finish"></div>
  `

const updateStopwatch = () => {
  const timeSinceLastAnswer = Math.floor((Date.now() - dates.lastAnswer) / 1000)
  stopWatchElement.querySelector("div").innerHTML = timeSinceLastAnswer
}

const updateTimePerAnswer = () => {
  const totalTime = (Date.now() - dates.sessionStart) / 1000
  const completedCount = getCompletedCount()
  timePerAnswerElement.querySelector("div").innerHTML = Math.floor(
    totalTime / completedCount
  )
}

const updateFinish = () => {
  const totalTime = Date.now() - dates.sessionStart
  const completedCount = getCompletedCount()
  const rate = Math.floor(totalTime / completedCount)
  const amountLeft = getAvailableCount()
  const estimateTimeRemaining = amountLeft * rate
  const estimateFinishDate = new Date(Date.now() + estimateTimeRemaining)
  const finishTime = estimateFinishDate.toLocaleString().split(", ")[1]
  finishElement.querySelector("div").innerHTML = finishTime
}

const start = () => {
  const container = document.createElement("div")
  container.classList.add("wariai-stats")
  container.appendChild(stopWatchElement)
  container.appendChild(timePerAnswerElement)
  container.appendChild(finishElement)
  document.querySelector("#character").appendChild(container)
  setInterval(() => {
    updateStopwatch()
    updateTimePerAnswer()
    updateFinish()
  }, 500)
}

const intervalId = setInterval(() => {
  if (isReady) {
    clearInterval(intervalId)
    start()
  }
}, 1000)

document.onerror = e => {
  alert(e)
}
