/*
    Name: loops.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 6 - Loops
*/

const isPrime = (num) => { // Function to determine whether a given number is a prime number. Takes one argument: the number to check
    const target = Math.floor(num/2); // Divide the supplied number by 2 as anything greater than half will never go into the number evenly (doing this reduces processing load by 50%)
    let prime = num != 1; // 1 is not a prime number, all other numbers will default to true
    for(let i = 2; i <= target; i++) { // Loop through all numbers up to the target as set above
        if(num % i === 0) { // Each iteration of the loop checks to see if the supplied number can be evenly divided by the iteration number
            prime = false; // If it can, then this is not a prime number
            break; // Exit the loop
        }
    }
    return prime; // Return a boolean to indicate if the number is a prime number
}

const checkNum = (num) => { // Function to determine the correct response to print
    switch(true){ 
        case isPrime(num): // Check if the number is a prime number
            return "prime"; // If it is, return "prime"
        case (num % 15 === 0): // Check if the number can be evenly divided by 15 (evenly divided by both 3 and 5)
            return "fizzbuzz"; // If it can, return "fizzbuzz"
        case (num % 5 === 0): // Check if the number can be evenly divided by 5
            return "buzz"; // If it can, return "buzz"
        case (num % 3 === 0): // Check if the number can be evenly divided by 3
            return "fizz"; // If it can, return "fizz"
        default: // None of the above cases are true...
            return num; // ...so return the number
    }
}

const fizzBuzz = (num=1) => { // Function to print out the numbers or appropriate words - takes one argument: the number to loop to
    if(!(Number.isInteger(num) && num > 1)){ // Check the supplied parameter is a positive integer greater than one
        return false; // If it isn't, return false.
    }
    for(let i = 1 ; i <= num ; i++){ // Loop from 1 to the supplied number
        console.log(checkNum(i)); // Pass the iteration number to the "checkNum" function and print out the returned value to the console
    }
    
}

fizzBuzz(100); // Invoke the fizzBuzz function with the required number