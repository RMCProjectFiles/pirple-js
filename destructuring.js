/*
    Name: destructuring.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 10 - Destructuring
*/

/* 
    Destructuring Arrays
    --------------------
    When destructuring arrays we do so by referencing each element of the array. Each element does not need to be assigned to a variable as those prior to the target element can be skipped. The declaration and assignment of variables is done within square brackets
*/

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Create a simple array of numbers
const [one, two, three] = arr; // Access the first three elements of the array and extract the values out to three new constants
console.log(one, two, three); // Print the constants out to the console

const [, , , four, five, ...rest] = arr; // Access the next two elements of the array (by skipping over the first three elemts) and extract the values out to three new constants. Lastly, save the rest of the array using the rest operator (...)
console.log(four, five, rest); // Print the values to the console. "rest" will return an array of the remaining values from the original array.
console.log(...rest) // Printing the value of "rest" using the rest operator (...) will print the remaining values individually.

const arr2 = [1, 2, 3]; // Create another simple array of numbers
const [num1, num2, num3, num4 = 4] = arr2; // Create consts for each index in the array. Note that the array only has three elements, so a default value is assigned four the num4 const.
console.log(num4); // Print the value of the num4 const. If a default had not been assigned, this would have returned "undefined" as the array only had three elements.

/* 
    It is possible to the values of two varaibles around using the array destructuring method
*/

let val1 = 100; // Create a let and assign it a numeric value - 100
let val2 = 200; // Create a let and assign it a numeric value - 200
[val1, val2] = [val2, val1]; // By using array destructuring, we can swap the values
console.log(val1, val2); // 200, 100

/* 
    Destructuring Objects
    --------------------
    When destructuring objects we do so by referencing the required key of the object. The declaration and assignment of variables is done within curly braces
*/

const obj1 = {
    customerId: 123,
    customerUser: "customer1",
    customerCreditLimit: 1000,
} // Create an object with three keys

const {customerId, customerCreditLimit} = obj1; // Target two of the object keys and save them to constants using destructuring
console.log(customerId, customerCreditLimit); // Print the values of the constants to the console.
const {customerId: custId, customerCreditLimit: custCredit} = obj1; // Save the constants with names that do not match the object key name
console.log(custId, custCredit); // Print the values of the constants to the console.

const obj2 = {
    employeeId: 456,
    employeeName: "Joe Blow",
    employeeDepartment: "IT",
    employeeAddress: { // Child (nested) object
        line1: "123 Any Street",
        line2: "Any Suburb",
        line3: "Any Town",
        line4: "Anywhere",
        phone: { // Grand-child (sub-nested) object
            mobile: "777-888-999",
            home: "444-555-666",
            internal: "111",
        },
        zip: "90210",
    }
} // Create an object with four keys, including a nested and a sub-nested object

const {employeeAddress} = obj2; // Extract the nested address from the parent object
console.log(employeeAddress); // Print the object to the console.
const {line1} = employeeAddress; // Extract the first line of the address from the object
console.log(line1); // Pring the constant to the console
const {employeeName, employeeAddress: {line3}, employeeAddress: {phone: {mobile}}} = obj2; // Extract values from the parent, child and grand-child objects using destructuring and save to constants
console.log(employeeName, line3, mobile); // Print the constants to the console.