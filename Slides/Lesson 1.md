
# ACS 4310 - Lesson 1

## Welcome to Data Visualization!

The goal of this lesson is to get started with data visualization. You will look at needed to make information visible.

The first step in the process is asking questions of the data you're working with. The code you'll write in this assignment will answer those questions. 

<!-- > -->

## Why you should know this or industry application

To make data visible you need to measure and quantify the data. While many programs have function built in that handle these operations it good to know how they work and how to implement them yourself. 

The tools you will use for this are some of the most important tools to have in your coding tool box. 

<!-- > -->

## Learning Objectives

- Write with arrow functions 
- Use callbacks
- Identify values in the Titanic dataset
- Extract data and derive relevant values

<!-- > -->

## What is Data visualization? 

What do you picture when you think of data visualization? 

- Pair up and look for examples of data visualzation. 
- Share with your partner
- Share with the class

## Overview

The goal today is to look at the Titanic dataset and use JavaScript to extract relevant data from it using JavaScript.

## Arrow functions 

Arrow functions are great to use when passing a function as a parameters. Understanding the syntax used by arrow functions can make your shorter and easier to read. 

Take a look at a map example: 

```JS 
// A regular function 

function world() {
  console.log('World')
}

world() // invoke this function


// An arrow function

const hello = () => {
  console.log('Hello')
}

hello()

// Parameters go in the ()

const foo = (x, y) => {
  console.log(x * y)
}

foo(4, 3)


// If the function is on a single line the 
// {} can be omitted

const bar = (x, y) => console.log(x / y)

bar(3, 4)


// If there is only a single parameter the 
// () can be omitted

const apples = (x) => { return x * 2 }
const oranges = x => x * 2 // Value is returned!

console.log( oranges(3) ) // 6
console.log( apples(3) )  // 6


// If there are no parameters you need to include
// () or a _

const pi = () => 3.14

console.log( pi() ) // -> 3.14

const euler = _ => 2.7182
console.log( euler() ) // 2.7182
```

Study up! Here's an article on Arraow functions: https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/

### Arrow function Practice

Copy this repo and start with the [01-arrow-function-practice.js](https://github.com/Tech-at-DU/arrow-functions-and-callback-challenges).

Where do Arrow function work best? 

Arrow functions work best for callbacks and situations where a function doesn't need identity. 

<!-- .slide: data-background="#087CB8" -->
## [**10m**] BREAK

Take a ten minute break.

## Callbacks

What's a callback? 

A callback is a function that is passed to another function as a parameter. Arrow functions are good here since these functions are often written inline and the Arrow function's compact syntax works well.

When writing JS you'll callbacks everywhere. Here are a few JS examples: 

`setTimeout` takes a callback and invokes it a number of milliseconds in the future. This callback takes no parameters. 

```JS
// Set time out takes a callback as it's first parameter
setTimeout(<callback>, <time>)
// It executes the callback in the future. 
// In this example the callback is run 1 sec later.
setTimeout(() => console.log('1 sec later'), 1000)
// Notice the arrow function used here! 
```

The previous example could have been written in a longer form like this: 

```JS
// Written across more lines
setTimeout(() => {
  console.log('1 sec later')
}, 1000)
```

You can also pass a named function as a callback. 

```JS
// Define a function
const remindMeLater = () => {
  console.log('Do the dishes...')
}
// Use a function stored in a variable
setTimeout(remindMeLater, 1000)
```

What other functions take callbacks? Can you name any? 

- `setInterval(callback, time)`
- `forEach(callback)`
- `map()`
- `filter`
- `reduce`

### foreach()

`forEach` takes a callback and invokes the callback once for each item in the array. It also passes each item in the array to the calback as the first parameter of the callback.

```JS
// forEach is a method of Array
arr.forEach(callback)
```

Imagine `forEach` is going to run the callback once for each item in `arr`. With each iteration it passes each item in the array to the callback as the first parameter. 

```JS
// Array forEach takes a function and executes 
// it once for each item in an Array
const arr = [11,22,33,44]
arr.forEach(item => console.log(item * 3))
```

This works for "stored" functions also: 

```JS
const arr = [11,22,33,44]
const double = n => console.log(n * 2)
arr.forEach(double) // prints each value * 2
```

`forEach` has a couple more optional parameters it provides to the callback. 

```JS
// forEach has a couple optional parameters
const numbers = [11,22,33,44]
numbers.forEach((item, index, arr) => {
  // Use the index if needed
  console.log(item * index)
})
```

Call backs are functions that we pass as arguments to other functions. 

NOTE! 

- **argument** is a value passed to a function
- **parameter** is the name of a variable storing a value passed to a function

For example: 

```JS
const hello = (name) => {
  return `hello ${name}`
}

hello('Francois')
```

In the example above "Francois" is the argument, it's a string value, and `name` is the parameter.

### Callback Exercise

Try these practice exercises with callbacks: [02-callback-practice.js](https://github.com/Tech-at-DU/arrow-functions-and-callback-challenges)