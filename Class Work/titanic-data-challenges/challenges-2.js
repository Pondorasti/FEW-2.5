// ================================================================

// Titanic Dataset challenges!

// Your goal is to write some functions that will extract
// relevant data from the dataset.

// Write your code here in this file.

// *************************************
// Test your code by running: `npm test`
// *************************************

// Each of the functions below expects to receive the Titanic data
// as the parameter data. Your goal is to extract the relevant
// piece of information from the data and return it.

// ===============================================================

// ---------------------------------------------------------------
// 1 -------------------------------------------------------------
// Return an array of all the values in data for a given property
// For example if property = 'fare' the output should be a list of
// all fares something like: [7.3125, 15.75, 7.775, 10.5, ...]
// Or if property = 'age' -> [40, 26, 22, 28, 23, 45, 21, ...]

const getAllValuesForProperty = (data, property) => {
  return data.map((item) => item.fields[property])
}

// 2 -------------------------------------------------------------
// Return an array where a given property matches the given value
// For example property = 'sex' and value = 'male' returns an
// array of all the male passengers [{...}, {...}, {...}, ...]

const filterByProperty = (data, property, value) => {
  return data.filter((item) => item.fields[property] === value)
}

// 3 -------------------------------------------------------------
// Filter out missing or null values
// Return an array where the objects that have undefined for a
// given property have been removed

const filterNullForProperty = (data, property) => {
  return data.filter((item) => item.fields[property] !== undefined)
}

// 4 -------------------------------------------------------------
// Abstract the sum by creating a function that returns the sum
// for any (numeric) property
// Return the total of all values for a given property. This

const sumAllProperty = (data, property) => {
  return filterNullForProperty(data, property).reduce((sum, item) => sum + item.fields[property], 0)
}

// 5 -------------------------------------------------------------
// Count unique values for property. The goal here is return an
// object with keys equal to the unique values for a property and
// values equal to the number of times that property appears. For
// example the embarked property has three unique values: S, C,
// and Q, and a couple passengers have undefined for this property.
// So the output should be: { S: 644, C: 168, Q: 77, undefined: 2 }
// That is 644 passengers embarked at South Hampton. 168 embarked
// at Cherbourg, 77 emabrked at Queenstown, and 2 are undedfined

const countAllProperty = (data, property) => {
  return data.reduce((frequency, item) => {
    const key = item.fields[property]
    if (key in frequency) {
      frequency[key] += 1
    } else {
      frequency[key] = 1
    }

    return frequency
  }, {})
}

// 6 ------------------------------------------------------------
// Make histogram. The goal is to return an array with values
// of a properties divided into buckets and counting the number
// of items in each bucket.

const makeHistogram = (data, property, step) => {
  const ans = filterNullForProperty(data, property).reduce((buckets, item) => {
    const index = Math.floor(item.fields[property] / step)
    if (buckets[index]) {
      buckets[index] += 1
    } else {
      buckets[index] = 1
    }

    return buckets
  }, [])
  // .map((item) => item || 0) This s**t does not work!! 😤
  return Array.from(ans, (v) => v || 0)
}

// 7 ------------------------------------------------------------
// normalizeProperty takes data and a property and returns an
// array of normalized values. To normalize the values you need
// to divide each value by the maximum value in the array.

const normalizeProperty = (data, property) => {
  const maxValue = filterNullForProperty(data, property).reduce(
    (maxValue, item) => Math.max(maxValue, item.fields[property]),
    -Infinity
  )
  return data
    .filter((item) => !isNaN(item.fields[property]))
    .map((item) => item.fields[property] / maxValue)
}

// 8 ------------------------------------------------------------
// Write a function that gets all unique values for a property.
// Given the array of data and a property string it should return
// an array of all of the unique values under that property.
// For example if the property string were "sex" this function
// would return ['male', 'female']

const getUniqueValues = (data, property) => {
  return data.reduce((uniques, item) => {
    const value = item.fields[property]
    if (!uniques.includes(value)) {
      uniques.push(value)
    }

    return uniques
  }, [])
}

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
  getAllValuesForProperty,
  filterByProperty,
  filterNullForProperty,
  sumAllProperty,
  countAllProperty,
  makeHistogram,
  normalizeProperty,
  getUniqueValues,
}
