/*
    Name: switchStatements.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 5 - Switch statements
*/

function timeAdder(value1=0, label1="", value2=0, label2=""){

    //Nested function to determine whether the passed values are positive integers
    const isPosInt = (num) => {
        return Number.isInteger(num) && num > 0;
    }    

    if(!isPosInt(value1) || !isPosInt(value2)){ // Invoke the above nested function to check the passed values
        return false; // If either of the passed values is invalid, return false
    }

    // Nested function to determine whether the passed labels are valid
    const validSingular = (label) => {
        switch(label){ // Switch statment to determine whether passed value matches expected value
            case "second": 
            case "minute": 
            case "hour": 
            case "day":
                return true; // Passed value is valid 
            default:
                return false; // Passed value is not valid
        }
    }

    const validPlural = (label) => {
        switch(label){ // Switch statment to determine whether passed value matches expected value
            case "seconds": 
            case "minutes": 
            case "hours": 
            case "days": 
                return true; // Passed value is valid 
            default:
                return false; // Passed value is not valid
        }
    }

    // Make sure that the label passed is appropriate for the matching value (1 = singular, greater than 1 = plural)
    if((value1 === 1 && !validSingular(label1) || value1 > 1 && !validPlural(label1)) || (value2 === 1 && !validSingular(label2) || value2 > 1 && !validPlural(label2))) { // Invoke the above nested functions to check the passed labels are valid
        return false; // If either of the passed values is invalid, return false
    }


    // Nested function to convert the supplied denominator value into the lowest denominator value
    const getDenominatorValue = (lab, val, denom) => { // Three arguments - lab = the label supplied, val = the value supplied, denom = single character string to indicate the lowest common denominator
        const d = {
            hours: 24,
            minutes: 1140,
            seconds: 86400
        } // Breakdown of one day
    
        const h = {
            minutes: 60,
            seconds: 3600
        } // Breakdown of one hour
    
        const m = {
            seconds: 60
        } // Breakdown of one minute

        if(lab === "day" || lab === "days"){ // If the supplied value is labelled as "day" or "days"
            switch(denom){ // Determine the required denominaor
                case "h":
                return d.hours * val; // Return the number of hours in one day multiplied by the supplied value

                case "m":
                return d.minutes * val; // Return the number of minutes in one day multiplied by the supplied value

                case  "s":
                return d.seconds * val; // Return the number of seconds in one day multiplied by the supplied value
            }
        }
        if(lab === "hour" || lab === "hours"){ // If the supplied value is labelled as "hour" or "hours"
            switch(denom){ // Determine the required denominaor 
                case "m":
                return h.minutes * val; // Return the number of minutes in one hour multiplied by the supplied value
    
                case  "s":
                return h.seconds * val; // Return the number of seconds in one hour multiplied by the supplied value
            }         
        }
        if(lab === "minute" || lab === "minutes"){ // If the supplied value is labelled as "minute" or "minutes"
            return m.seconds * val; // Return the number of seconds in one minute multiplied by the supplied value
        }      
    }

    // Find the lowest common denominator
    let lab = ""; // Default value for the "lab" variable
    let val1 = val2 = 0; // Default variable for the "val1" and "val2" variables

    if((label1 === "day" || label1 === "days") && (label2 === "day" || label2 === "days")){ // If both labels are for either "day" or "days", reset the "let" variables appropriately
        lab = "d";
        val1 = value1;
        val2 = value2;
    }
    if((label1 === "hour" || label1 === "hours") || (label2 === "hour" || label2 === "hours")) { // If either of the labels are "hour" or "hours", reset the "let" variables appropriately
        lab = "h";
        if(label1 === "hour" || label1 === "hours"){
            val1 = value1; 
            val2 = (label2 === "hour" || label2 === "hours") ? value2 : getDenominatorValue(label2, value2, lab); // Determine the correct value for val2, if the label is "hour" or "hours", use value2, else call the above nested function to get the correct value in hours
        }else{
            val1 = (label1 === "hour" || label1 === "hours") ? value1 : getDenominatorValue(label1, value1, lab); // Determine the correct value for val1, if the label is "hour" or "hours", use value1, else call the above nested function to get the correct value in hours
            val2 = value2;
        }
    }
    if((label1 === "minute" || label1 === "minutes") || (label2 === "minute" || label2 === "minutes")){ // If either of the labels are "minute" or "minutes", reset the "let" variables appropriately
        lab = "m";
        if(label1 === "minute" || label1 === "minutes"){
            val1 = value1;
            val2 = (label2 === "minute" || label2 === "minutes") ? value2 : getDenominatorValue(label2, value2, lab); // Determine the correct value for val2, if the label is "minute" or "minutes", use value2, else call the above nested function to get the correct value in hours
        }else{
            val1 = (label1 === "minutes" || label1 === "minutes") ? value1 : getDenominatorValue(label1, value1, lab); // Determine the correct value for val1, if the label is "minute" or "minutes", use value1, else call the above nested function to get the correct value in hours
            val2 = value2;
        }        
    }
    if((label1 === "second" || label1 === "seconds") || (label2 === "second" || label2 === "seconds")){ // If either of the labels are "second" or "seconds", reset the "let" variables appropriately
        lab = "s";
        if(label1 === "second" || label1 === "seconds"){
            val1 = value1;
            val2 = (label2 === "second" || label2 === "seconds") ? value2 : getDenominatorValue(label2, value2, lab); // Determine the correct value for val2, if the label is "second" or "seconds", use value2, else call the above nested function to get the correct value in hours
        }else{
            val1 = (label1 === "second" || label1 === "seconds") ? value1 : getDenominatorValue(label1, value1, lab); // Determine the correct value for val1, if the label is "second" or "seconds", use value1, else call the above nested function to get the correct value in hours
            val2 = value2;
        }        
    }

    // Nested function to generate the return value - can be called recursively if the total time can be evenly divided by the next greater denominator (eg. 60 minutes will be retured as 1 hour by recursively calling the function and incrementing minutes to hours. Whereas 61 minutes will be returned as 61 minutes).
    const addTime = (val1,val2,label) => { // Takes three parameters - the first two are the values to be added together, the third is a single character string to indicate the time part (seconds, minutes, hours, days)
        const total = val1 + val2; // Add the two values
        switch(label){ // Determine the time part
            case "s": 
                if(total % 60 === 0){ // If the number of seconds can be evenly divided by 60 (number of seconds in one minute)
                    return addTime(total / 60, 0, "m"); // Recursively call the function with the number of minutes as the first argument (total number of seconds divided by 60), zero as the second argument (total already calculated, so we don't want to add anything to it) and "m" as the third argument
                }
                return [total, total === 1 ? "second" : "seconds"]; // Return an array containing the total as the first element, followed by the correct grammar as the second element
            case "m":
                if(total % 60 === 0){ // If the number of minutes can be evenly divided by 60 (the number of minutes in one hour)
                    return addTime(total / 60, 0, "h"); // Recursively call the function with the number of hours as the first argument (total number of minutes divided by 60), zero as the second argument (total already calculated, so we don't want to add anything to it) and "h" as the third argument
                }
                return [total, total === 1 ? "minute" : "minutes"]; // Return an array containing the total as the first element, followed by the correct grammar as the second element
            case "h":
                if(total % 24 === 0){ // If the number of hours can be evenly divided by 24 (the number of hours in one day)
                    return addTime(total / 24, 0, "d"); // Recursively call the function with the number of days as the first argument (total number of hours divided by 24), zero as the second argument (total already calculated, so we don't want to add anything to it) and "d" as the third argument
                }
                return [total, total === 1 ? "hour" : "hours"]; // Return an array containing the total as the first element, followed by the correct grammar as the second element   
            case "d":
                return [total, total === 1 ? "day" : "days"]; // Return an array containing the total as the first element, followed by the correct grammar as the second element                              
        }
    }    

    return addTime(val1,val2,lab); // Invoke the above nested function with the calculated values.

}

console.log(timeAdder(1, "day", 24, "hours")); // [2, "days"]
console.log(timeAdder(3, "days", 86400, "seconds")); // [4, "days"]
console.log(timeAdder(1, "hour", 60, "minutes")); // [2, "hours"]
console.log(timeAdder(60, "minutes", 1, "hour")); // [2, "hours"]
console.log(timeAdder(1, "minute", 60, "seconds")); // [2, "minutes"]
console.log(timeAdder(1, "hour", 3600, "seconds")); // [2, "hours"]
console.log(timeAdder(23, "hours", 3600, "seconds")); // [1, "day"]
console.log(timeAdder(1, "second", 120, "seconds")); // [121, "seconds"]
console.log(timeAdder(1.2, "hours", 20, "minutes")); // false - 1.2 is not a positive integer
console.log(timeAdder(1, "hours", 20, "minutes")); // false - passed "hours" as second argument when should have passed "hour" (first argument is 1)
console.log(timeAdder({}, [], null, undefined)); // false - incorrect parameter types passed