/*
    Name: variables.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 2 - Variables
*/

/* ********************************************************** */
/*
    Var:
        Variables declared with var are function scoped, 
        meaning that variable assignment is hoisted to the top 
        of the current scope. Note that only the declaration 
        gets hoisted and not the assignment. Variables assigned
        using the var keyword are initialised with 'undefined'
        when hoisted. Variables declared with var can be 
        redeclared and reassigned and will also be attached to 
        window when declared in the global scope.
*/

/* ********************************************************** */
/*
    Let:
        Let variables are block scoped, meaning that the 
        variable is only available within the block in 
        which it was assigned (and nested blocks). Unlike 
        variables assigned with var, variables assigned 
        using let are not subject to hoisting and so do not 
        get initialised. Let variables can be reassigned, but 
        not redeclared within the same block. Variables 
        assigned with let will not be attached to window when 
        declared in the global scope.
*/

/* ********************************************************** */
/*
    Const:
        Const (short for 'constant') variables are block 
        scoped and so are only available within the block 
        that they were assigned (and nested blocks). 
        Unlike let variables, const variables cannot be 
        redeclared or reassigned, however, this does not mean 
        that they are immutable. Arrays and objects assigned
        with const can be mutated. Variables assigned with
        const do not get initialised and are not hoisted.        
        Variables assigned with const are not attached to 
        window when declared in the global scope.
*/

// Variable declaration examples

// An example of declaring a variable using the "var" keyword:
function myVarExample() {
    if (true) {
        var msg = "Demonstrates a variable using the var keyword"; // Declare the variable and assign it a string value
        console.log(msg + " as created in the if statement"); // Variable decalared within if statement is available for use within the if statement
    }

    console.log(msg + " is available outside the if statement in which it was created"); // Variable decalared within if statement is available outside the if statement (function scoped)
}

myVarExample(); // Call the above function



// An example of declaring a variable using the "let" keyword:
function myLetExample() {
    if (true) {
        let msg = ""; // Declare the variable and assign it an empty string value
        msg = "Demonstrates that a variable declared with the let keyword" // Can reassign the variable
        console.log(msg + " is available within the block in which it was created"); // Variable decalared within if statement is available for use within the if statement
    }

    console.log(typeof msg + " - the varibale created with the let keyword is not available outside of the block in which it was created"); // Will print "undefined" as the variable was declared within the above if statement and is thus not available outside of the if statement (block scoped)
}

myLetExample(); // Call the above function



// An example of declaring a variable using the "const" keyword:
function myConstExample() {
    const fruitArray = ["Apple","Pear","Banana"]; // Variable declared within the function block

    if (true) {
        fruitArray.push("Raspberry"); // Able to access the variable within the nested if statement (block scoped) and can mutate its value
    }

    console.log(fruitArray); // ["Apple","Pear","Banana","Raspberry"]
}

myConstExample();  // Call the above function



// An example of hoisting a variable created using the "var" keyword:
function myHoistingExample(){
    console.log(myHoistedVar); // "myHoistedVar" is not declared until the next lince of code, but JS has hoisted the variable declaration to the top of the function. Note that it will output "undefined" as only the declaration has been hoisted, not the assignment.

    var myHoistedVar = true; // Declaring the variable used above and assign it a value

    console.log(myHoistedVar); // true - the variable now has the value as assigned in the provious line of code
}

myHoistingExample(); // Call the above function