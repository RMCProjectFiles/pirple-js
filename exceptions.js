/*
    Name: exceptions.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 11 - Exceptions
*/

const reverseJsonArray = (str) => { // Constant function to reverse an array. Takes one parameter, a JSON string containing the array to reverse
    try { // The following code will fail if the passed parameter is missing or in the wrong format, so it is wrapped in a try/catch block
        const js = JSON.parse(str); // Parse the passed value to convert to JS
        return JSON.stringify(js.reverse()); // Return the reversed array as a JSON string
    } catch(e){ // If the above throws an error... 
        return false; // ...return false
    }
}

let str; // Declare a let variable to hold the stringified JSON

/* Invoke the function testing various scenarios */

str = JSON.stringify(['a','b']); // Stringified array containing two string values
console.log(reverseJsonArray(str)); // Invoke the function and print to the console. 

str = JSON.stringify([1,2]); // Stringified array containing two numeric values
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.

str = JSON.stringify([['a','b'], [1,2]]); // Stringified array containing two arrays
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.

str = JSON.stringify([{name: 'Test'}, {name: 'Test 1'}]); // Stringified array containing two objects
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.

str = JSON.stringify([{name: 'Test'}, [1,2,3]]); // Stringified array containing complex data (one object and one array)
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.


console.log(reverseJsonArray()); // Invoke the function with no parameters passed and print to the console.
console.log(reverseJsonArray(true)); // Invoke the function with boolean value passed and print to the console.
console.log(reverseJsonArray([1,2,3])); // Invoke the function with non-stringified array passed and print to the console.

str = "[1,2}"; // Improperly formatted JSON
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.

str = JSON.stringify(['a']); // Stringified array containing one elementand print to the console.
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.

str = JSON.stringify([]); // Stringified empty array
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.

str = JSON.stringify([1,2,3,4]); // Stringified array containing an even number of values
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.

str = JSON.stringify([1,2,3]); // Stringified array containing an odd number of values
console.log(reverseJsonArray(str)); // Invoke the function and print to the console.