/*
    Name: functions.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 4 - Functions
*/

/*
    All men are mortal.
    Socrates is a man.
    Therefore, socrates is mortal.
*/

const checkMortality = ( mortal=false, men=[] ) => {
    
    const isMortal = !!mortal; // Coerce the "mortal" value to be a boolean
    const menArr = Array.isArray(men) ? men : []; // Ensure that the "men" parameter is an array - if it isn't, default it to an empty array

    const findSocrates = (man) => man === "Socrates"; // Function to determine whether Socrates is in the "menArr" array

    return isMortal && menArr.find(findSocrates) ? true : false; // Men are mortal and Socrates is a man - returns either true or false.
}

console.log( checkMortality( true, ["Adam", "Bob", "Jim", "Elvis", "Socrates"] ) ); // Returns true (Men are mortal and Socrates is in the array of men)
console.log( checkMortality( true, ["Adam", "Bob", "Jim", "Elvis", "Billy"] ) ); // Returns false (Men are mortal, but Socrates is not in the array of men)
console.log( checkMortality( false, ["Adam", "Bob", "Jim", "Elvis", "Socrates"] ) ); // Returns false (Men are not mortal, Socrates is in the array of men)
console.log (checkMortality() ); // Returns false (required parameters not passed to the function, so default values are used in the function)
console.log( checkMortality( {name: "Mary-Jane"}, 10 ) ); // Returns false (Incorrect parameters types passed, so default values are used in the function)


/*
    This cake is either vanilla or chocolate.
    This cake is not chocolate.
    Therefore, this cake is vanilla.
*/
const checkCakeFlavour = (choc=false) => {
    const isChocolate = !!choc; // Coerce the passed value to be a boolean
    const flavours = ["vanilla","chocolate"]; // The cake is either vanilla or chocolate

    return isChocolate ? "This cake is " + flavours[1] + ". Therefore, this cake is not " + flavours[0] : "This cake is not " + flavours[1] +". Therefore, this cake is " + flavours[0]; // Is the cake chocolate? Returns either true of false.
}

console.log( checkCakeFlavour(false) ); // "This cake is not chocolate. Therefore, this cake is vanilla" - "choc" parameter set to false.
console.log( checkCakeFlavour(true) ); // "This cake is chocolate. Therefore, this cake is not vanilla" - "choc" parameter set to true.
console.log( checkCakeFlavour() ); // "This cake is not chocolate. Therefore, this cake is vanilla" - no value passed to the function, so default value used.
console.log( checkCakeFlavour({msg: "JavaScript is funky!"}) ); // "This cake is not chocolate. Therefore, this cake is vanilla" - incorrect value passed to the function, so default value used.