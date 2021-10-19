console.log("1 ------------------------------")
// A regular function
function world() {
  console.log("World")
}

world() // invoke this function

console.log("2 ------------------------------")
// An arrow function
const hello = () => {
  console.log("Hello")
}

hello()

console.log("3 ------------------------------")
// Parameters go in the ()
const foo = (x, y) => {
  console.log(x * y)
}

foo(4, 3)

console.log("4 ------------------------------")
// If the function is on a single line the
// {} can be omitted
const bar = (x, y) => console.log(x / y)

bar(3, 4)

console.log("5 ------------------------------")
// If there is only a single parameter the
// () can be omitted
const func = (x) => x * 2 // Value is returned!

console.log(func(3)) // -> 6

console.log("6 ------------------------------")
// If there are no parameters you need to inlcude
// () or a _
const pi = () => 3.14

console.log(pi()) // -> 3.14

const greet = () => "hello"

greet()

function addSpaces(str) {
  const outStr = str.split().join("-")
  return outStr
}

console.log(addSpaces("Hello and welcome to functional programming"))

function choose(arr) {
  const r = Math.floor(Math.random() * arr.length)
  return arr[r]
}

console.log(choose(["Apples", "Bananas", "Pancakes"]))

function cubeArea(x, y, z) {
  return x * y * y
}

console.log(cubeArea(5, 6, 7))

console.log("7 ------------------------------")

/* ***********************************************
Define an arrow functon that takes two parameters 
the first is a name and second a prefix combine 
these to print: Good morning <prefix> <name>
for example: Good morning Mr. Mustard
*/
const compliment = (name, prefix) => console.log(`Good morning ${prefix} ${name}`)
compliment("Alex", "Mr.")

/* ***********************************************
If you haven't already rewrite the functions above
on a single line
*/
