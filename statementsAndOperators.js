/*
    Name: statementsAndOperators.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 3 - Statements and operators
*/


/*
    All men are mortal
    Socrates is a man.
    Therefore, socrates is mortal.
*/


const menAreMortal = true; // All men are mortal
const men = ["Adam","Bob","Jim","Elvis","Socrates"]; // Array of men

const findSocrates = (man) => man === "Socrates"; // Function to see if Socrates is a man

if(menAreMortal && men.find(findSocrates)){ // Check if men are mortal and whether Socrates is in the array of men
	console.log("All men are mortal. Socrates is a man. Therefore, Socrates is mortal"); // This will print to the console if both conditions are true.
}else{
    console.log("Either men are not mortal, or Socrates is not a man."); // This will print to the console if either of the conditions are false.
}

/*
    This cake is either vanilla or chocolate.
    This cake is not chocolate.
    Therefore, this cake is vanilla.
*/

const flavours = ["vanilla","chocolate"]; // This cake is either vanilla or chocolate.
const thisCake = flavours[0]; // This cake is not chocolate.

console.log(thisCake); // vanilla

if(thisCake !== "chocolate"){ // This cake is not chocolate.
    console.log("This cake is not chocolate. Therefore, this cake is vanilla"); // Therefore, this cake is vanilla.
}