/*
    Name: script.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Lecture 8 - Events
*/

let clickCount; // Create let in the global scope - used to keep track of how many squares have been filled

const endGame = (winner) => { // Constant function to show message to user at the end of the game

    if(!!winner === false){ // No winner specified, so must be "Cats game";
        alert("Cats game!");
    }else{ // Declare the winner
        alert(winner + " has won!");
    }

    drawGame(); // Reset the gane
}

const playGame = () => { // Constant function to play the game

    const x = { // Keep score of "X"
        row0 : 0,
        row1 : 0,
        row2 : 0,
        col0 : 0,
        col1 : 0,
        col2 : 0,
        dia0 : 0,
        dia1 : 0,
    }
    const o = { // Keep score of "O"
        row0 : 0,
        row1 : 0,
        row2 : 0,
        col0 : 0,
        col1 : 0,
        col2 : 0,
        dia0 : 0,
        dia1 : 0,
    }     
    
    const populateCell = (e) => { // Nested constant function to populate table cell with appropriate player ("X" or "O")
        const cell = e.target; // Determine the table cell to be updated
        const classes = cell.classList; // Create an array of classes associated with this table cell

        if(cell.innerText.length){ // Make sure that the cell has not been selected by a player
            return true; // If it has, we return out of the function at this point
        }

        const span = document.createElement("span"); // Create a new span
        const spanClass = clickCount % 2 === 0 ? "cross" : "circle"; // Determine the correct class to add to the span - if the click count can be evenly divided by 2, then we are playing "X", else we are playing "O"

        span.classList.add(spanClass); // Add the class to the span
        span.innerText = clickCount % 2 === 0 ? "X" : "O"; // Determine the correct text to add to the span - if the click count can be evenly divided by 2, then we are playing "X", else we are playing "O"

        cell.appendChild(span); // Add the span to the table cell

        // Keep track of the "score" for rows and columns
        for(const prop of classes){ // Loop over the array of classes
            if(clickCount % 2 === 0){ // Update score for "X"
                if(prop === "row0"){x.row0 = x.row0 + 1;} // If the class is "row0", update the row0 count
                if(prop === "row1"){x.row1 = x.row1 + 1;} // If the class is "row1", update the row1 count
                if(prop === "row2"){x.row2 = x.row2 + 1;} // If the class is "row2", update the row2 count
                if(prop === "col0"){x.col0 = x.col0 + 1;} // If the class is "col0", update the col0 count
                if(prop === "col1"){x.col1 = x.col1 + 1;} // If the class is "col1", update the col1 count
                if(prop === "col2"){x.col2 = x.col2 + 1;} // If the class is "col2", update the col2 count
            } else { // Update score for "O"
                if(prop === "row0"){o.row0 = o.row0 + 1;} // If the class is "row0", update the row0 count
                if(prop === "row1"){o.row1 = o.row1 + 1;} // If the class is "row1", update the row1 count
                if(prop === "row2"){o.row2 = o.row2 + 1;} // If the class is "row2", update the row2 count
                if(prop === "col0"){o.col0 = o.col0 + 1;} // If the class is "col0", update the col0 count
                if(prop === "col1"){o.col1 = o.col1 + 1;} // If the class is "col1", update the col1 count
                if(prop === "col2"){o.col2 = o.col2 + 1;} // If the class is "col2", update the col2 count
            }
        }

        // Update the "score" for diagonal lines
        if((classes[0] === "row0" && classes[1] === "col0") || (classes[0] === "row1" && classes[1] ===  "col1") || (classes[0] === "row2" && classes[1] ===  "col2")){ // top-left, middle, bottom-right
            if(clickCount % 2 === 0){ // Update the score for "X"
                x.dia0 = x.dia0 + 1;
            } else { // Update the score for "O"
                o.dia0 = o.dia0 + 1;
            }
        }

        if((classes[0] === "row0" && classes[1] === "col2") || (classes[0] === "row1" && classes[1] ===  "col1") || (classes[0] === "row2" && classes[1] ===  "col0")){ // top-right, middle, bottom-left
            if(clickCount % 2 === 0){ // Update the score for "X"
                x.dia1 = x.dia1 + 1;
            } else { // Update the score for "O"
                o.dia1 = o.dia1 + 1;
            }
        }        

        const xArray = Object.values(x); // Convert values of object x to an array
        const oArray = Object.values(o); // Convert values of object o to an array

        const findThree = (num) => {return num === 3} // Constant function to find 3

        if(xArray.find(findThree)){ // Are any of the values in the xArray 3?
            window.setTimeout( () => { endGame("X") }, 050); // If so, "X" is the winner (use setTimeout to ensure that the DOM is updated correctly before the alert is triggered)
        } else if(oArray.find(findThree)){ // Are any of the values in the oArray 3?
            window.setTimeout( () => { endGame("O") }, 050); // If so, "O" is the winner (use setTimeout to ensure that the DOM is updated correctly before the alert is triggered)
        } else { // No winner yet
            clickCount++; // Increment the clickCount
        
            if(clickCount === 9){ // If the count is 9, then all squares are filled
                const end = window.setTimeout( endGame, 050); // Show a message "Cats game" (use setTimeout to ensure that the DOM is updated correctly before the alert is triggered)
            } 
        }

    }

    const tb = document.getElementById("tbl"); // Target the table
    tb.addEventListener("click", populateCell); // Add an event listener
}

const drawGame = () => {
    clickCount = 0; // The game starts with no table cells populated, so the click count is zero
    const gameDiv = document.getElementById("gameDiv"); // Get the container div
    gameDiv.innerHTML = ""; // Make sure that the container div is empty (clear out any previous game)

    const table = document.createElement("table"); // Create a new table element
    table.id = "tbl"; // Give the table an id

    for(let outer = 0 ; outer < 3 ; outer++){ // The table needs three rows...
        const row = document.createElement("tr"); // Each iteration of the outer loop creates a new row

        for(let inner = 0 ; inner < 3 ; inner++){ // Each iteration of the outer loop has a nested loop to create three cells per row
            const cell = document.createElement("td"); // Create the cell
            const outerClass = "row" + outer; // Create a class name based on the outer loop
            const innerClass = "col" + inner; // Create a class name based on the inner loop
            cell.classList.add(outerClass, innerClass); // Add the classes to the table cell
            row.appendChild(cell); // Append the cell to the row
        } // End the nested loop

        table.appendChild(row); // Append the row to the table

    } // End the outer loop
    gameDiv.appendChild(table); // Append the table to the gameDiv

    playGame(); // Play the game
}

drawGame();