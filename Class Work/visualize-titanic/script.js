import data from "./titanic-data.js"

// Get a reference to the #titanic
const titanic = document.querySelector("#titanic")

// Set some styles on the titanic
// display flex, justifyContent center, alignItems flex-end
titanic.style.display = "grid"
// Change the number of columns on the titanic to 34
titanic.style.gridTemplateColumns = "repeat(auto-fill, 60px)"
titanic.style.gridAutoRows = "60px"
titanic.style.gridGap = "1px"
titanic.style.width = "calc(100% - 64px)"
titanic.style.justifyContent = "center"

document.body.style.display = "flex"
document.body.style.justifyContent = "center"
document.body.style.alignItems = "center"
document.body.style.paddingTop = "64px"

// Map over the data and make a new element for each passenger
const passengers = data.map((p) => {
  return document.createElement("div")
})

// Loop over each passenger and append them to the titanic
passengers.forEach((p) => {
  titanic.appendChild(p)
})

// Let's loop over each passenger and set some styles
passengers.forEach((p, i) => {
  p.style.width = "10px"
  p.style.height = "10px"
  p.style.backgroundColor = "#000"
  p.style.margin = "auto"
})

// Challenges -

// Make the squares a little bigger 15px by 15px.
// You'll need to change both the gridTemplateColumn on the
// titanic and the width and height of each passenger.

passengers.forEach((p) => {
  p.style.width = "25px"
  p.style.height = "25px"
})

const normalizedData = data.sort((a, b) => {
  if (isNaN(a.fields.fare)) {
    return 1
  } else if (isNaN(b.fields.fare)) {
    return -1
  }
  return b.fields.fare - a.fields.fare
})

const maxFare = normalizedData
  .filter((passenger) => !isNaN(passenger.fields.fare) && passenger.fields.fare !== -1)
  .reduce((maxFare, passenger) => (maxFare = Math.max(maxFare, passenger.fields.fare)), -Infinity)

console.log(maxFare)

passengers.forEach((p, i) => {
  // Display each passenger as a circle if they are female.
  // Do this by setting the borderRadius of each passenger.
  // Match the passenger in passengers to the object data
  // in the data array by the index.
  p.style.borderRadius = data[i].fields.sex === "female" ? "100%" : "0"

  // Display each passengers who did not survive as
  // opacity 0.5.
  p.style.opacity = data[i].fields.survived === "No" ? 0.5 : 1

  // Set the backgroundColor of each passenger by their
  // embarked value. There are three possible values:
  // 'S', 'C', and 'Q'
  if (data[i].fields.embarked === "S") {
    p.style.backgroundColor = "red"
  } else if (data[i].fields.embarked === "C") {
    p.style.backgroundColor = "green"
  } else if (data[i].fields.embarked === "Q") {
    p.style.backgroundColor = "blue"
  }

  // pclass
  if (data[i].fields.pclass === 1) {
    p.style.border = "2px solid black"
  }

  // fare
  p.style.transform = `scale(${normalizedData[i].fields.fare / maxFare + 0.6})`
})
