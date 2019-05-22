/*
    Name: script.js
    Author: Richard Chappell
    Course: Keeping Up With The JavaScripts - Part 1: ES6
    Homework: Project #1 - To Do List
*/

const storage = window.localStorage; // Access the local storage and save it to a const in the global scope

let allUserData, userIndex, userData, userList, userListId = -1; // Let variables to store user and list information

const createEl = (el, attr={}, parent="", txt="", listener={}) => { // Const function to create HTML elements, set attributes, add inner text, assign parent node and event handlers
    const newElement = document.createElement(el); // Create the required HTML element
    const attrs = Object.entries(attr); // Break the object down into an array of arrays (each sub array contains two elements: the name/value pairs)
    const listeners = Object.entries(listener); // Break the object down into an array of arrays (each sub array contains two elements: the name/value pairs)

    for(const i of attrs){ // Loop over the array of required attributes
        newElement.setAttribute(i[0], i[1]); // Add the attribute to the newly created element
    }

    for(const j of listeners){ // Loop over the array of required event listeners
        newElement.addEventListener(j[0], j[1]); // Add the event listener to the newly created element
    }    

    if(txt.length){ // If inner text is required...
        newElement.innerText = txt; // ...set it here
    }
    
    if(parent !== ""){ // If the newly created element is to be a child of another element...
        parent.appendChild(newElement); // ...set the parent relationship here
    }

    return newElement; // Return the new element
}

const showError = (errorArray, id="app") => { // Const function to display error messages
    const div = document.getElementById("errorDiv"); // Target the div with an id of "errorDiv" (if there is one) and save it to a const
    if(div){ // If the div exists...
        div.parentNode.removeChild(div); // ...remove it from it's parent
    }    
    const el = document.getElementById(id); // Target the specified div and save it to a const
    const errorDiv = createEl("div", {id: "errorDiv"}, el); // Create a div to display error messages within
    createEl("p", {}, errorDiv, "Please correct the following errors:"); // Create paragraph with introductory error message
    const ol = createEl("ol", {}, errorDiv); // Create an ordered list to display the error message(s)

    for(const msg of errorArray){ // Loop over the error array
        let li = createEl("li", {}, ol, msg); // Create a list item for each message in the array
    }
}

const validateForm = (frm) => { // Const function to validate a form - takes one argument, the form to validate
    let validForm = true; // By default, the form is valid

    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regular expression to validate an email address
    const errorArray = []; // Array to hold error messages

    for(let i = 0 ; i < frm.elements.length ; i++){ // Loop through each element of the form
        if(!frm.elements[i].name){ // If the element does not have a name (such as the buttons), skip this iteration
            continue;
        } else { // Validate the element
            if(!frm.elements[i].value.trim().length){ //  All form elements must have a value
                validForm = false; // Set the validForm variable to false
                errorArray.push(frm.elements[i].getAttribute("data-label") + " must be provided"); // Get the title of the form element, create an appropriate error message and add it to the array
            }
            if(frm.elements[i].name === "email"){ // Validate email addresses
                if(!emailRegEx.test(String(frm.elements[i].value.trim()).toLowerCase())){ // Test against the regular expression above
                    validForm = false; // Set the valid form variable to false
                    errorArray.push(frm.elements[i].getAttribute("data-label") + " must be a valid email address"); // Get the title of the form element, create an appropriate error message and add it to the array
                }
            }
            if(frm.elements[i].type === "checkbox" && !frm.elements[i].checked){ // Checkbox must be checked
                validForm = false; // Set the validForm variable to false
                errorArray.push(frm.elements[i].getAttribute("data-label") + " must be checked"); // Get the title of the form element, create an appropriate error message and add it to the array
            }       
        }
    }

    if(!validForm){ // If the form is not valid
        showError(errorArray, frm.id); // Show error message
    }

    return validForm; // Return the value of the validForm variable
}

const logoutUser = () => { // Constant function to log out a user
    userIndex = undefined; // Reset the userIndex
    userData = undefined; // Reset the userData
    indexScreen(); // Show the default index screen
}

const headerButtons = () => { // Const function to generate and display the buttons displayed at the top of all logged in pages
    const app = document.getElementById("app"); // Target the div with an id of "app"

    createEl("button", {class: "btnSmall"}, app, "Account Settings", {click: signupScreen}); // Create a button to link to the account settings page
    createEl("button", {class: "btnSmall"}, app, "Dashboard", {click: showDashboard}); // Create a button to link to the dashboard 
    createEl("button", {class: "btnSmall"}, app, "Log Out", {click: logoutUser}); // Create a button to log out the user
}

const checkTitle = (title, arrPos) => { // Constant function to check if a giveb title already exists - ignores the title if it is being edited (so as not to return a false positive)
    let titleExists = false; // By default we assume that the title does not exist
    for(let i = 0 ; i < userData.lists.length ; i++){ // Loop over the user's lists
        if(arrPos === i){ // If we are editing an existing list, ignore the entry so as not to return a false positive
            continue; // Skip to the next iteration
        } else { // Check this list title
            if(userData.lists[i].title === title){ // If the title matches the one the user has entered...
                titleExists = true; //...set a flag to indicate that the title exists...
                break; //...and exit the loop
            }
        }
    } 
    
    return titleExists; // Return the boolean
}

const saveUserData = () => {
    const dta = JSON.parse(storage.getItem("userData")) // Get the data from the local storage and save it to a constant
    dta[userIndex] = userData; // Update the relevant array index with the present user's data
    storage.setItem("userData", JSON.stringify(dta)); // Save the data to the local storage
}

const saveListTitle = (e) => { // Constant function to save a To-Do list
    e.preventDefault(); // Button exists in a form, so prevent the default form submission
    const frm = document.getElementById("toDoListFrm"); // Target the form with an id of "toDoListFrm" and save it to a constant
    const validFrm = validateForm(frm); // Validate the sign up form
    
    if(!validFrm){ // If the form is not valid...
        return false; // ...exit this function by returning false
    }

    const title = document.getElementById("listTitle").value.trim(); // Target the list title and save it to a const
    const arrPos = Number(document.getElementById("listId").value); // Target the listId id and save it to a const
    const titleExists = checkTitle(title, arrPos); // Check that the title hasn't already been used by this user

    if(titleExists){ // If the title has already been used, create an array with an appropriate error message
        const errorArray = ["The tite you have entered already exists. Please enter another one."];
        showError(errorArray, frm.id); // Show ther error message and...
        return false; // ...exit this function by returning false
    }

    const list = { // Save the list data into an object
        title: document.getElementById("listTitle").value.trim(), // Save the list title
        listItems: userList // Set the list item to be the userList
    }

    if(userListId > -1){ // If we are editing an existing list title
        userData.lists[userListId] = list; // Update the list title at the appropriate array index
    } else { // Else, we are adding a new list
        userData.lists.push(list); // Add the list to the end of the array
        userListId = userData.lists.length -1; // Update the id to be the length of the array, minus 1
    }
    saveUserData();
    showList(); // Reload the list
}

const saveList = (e) => {
    e.preventDefault(); // Button exists in a form, so prevent the defaul form submission
    const frm = document.getElementById("toDoListItemFrm"); // Target the form with and id of "toDoListItemFrm" and save it to a constant
    const validFrm = validateForm(frm); // Validate the form

    if(!validFrm){ // If the form is not valid...
        return false; //...exit this function by returning false
    }

    const toDo = document.getElementById("toDo").value.trim(); // Get the value of the new To-Do item...
    
    userList.push([toDo, 0]) //...and add it to the array

    saveUserData(); // Save the user data to local storage
    const ul = document.getElementById("list");
    let li = createEl("li", {}, ul); // Create a list item and append it to the unordered list        
    let label = createEl("label", {}, li); // Create a label and append it to the list item
    let chkbx = createEl("input", {type: "checkbox", value: userList.length -1, class: "chk"}, label, "", {click: toggleCompleted}); // Create a checkbox, set the parameters (type, value) and append it to the label 
    let span = createEl("span", {}, label, toDo); // Create a span, append it to the label and set the inner text    
    frm.reset(); // Clear the form input input
 }

const toggleCompleted = (e) => { // Constant function to mark a list item as completed
    const itemId = e.target.value; // The item id is stored in the value attribute of the checkbox
    userList[itemId][1] = e.target.checked ? 1 : 0; // If the checkbox is checked, set the value to 1, else set it to 0
    saveUserData(); // Save the user data to local storage
    const prnt = e.target.parentNode; // Get the parent node
    const span = prnt.getElementsByTagName("span")[0]; // Find the span within the parent
    span.setAttribute("class", e.target.checked ? "strk" : ""); // Add/remove the class as appropriate
}

const showList = () => { // Contant function to create or edit a list
    const app = document.getElementById("app"); // Target the div with an id of "app"
    app.innerHTML = ""; // Clear any HTML from within the div
    headerButtons(); // Add the header buttons

    const h2 = createEl("h2", {}, app, "Your To-Do List"); // Create an h2 header
    
    userList = userListId > -1 ? userData.lists[userListId].listItems : []; // If we are editing a list, set the list to the value stored, else create an empty array
    userListTitle = userListId > -1 ? userData.lists[userListId].title : ""; // If we are editing a list, set the title to the value stored, else create an empty string

    const frm1 = createEl("form", {action: "javascript:;", method: "post", id: "toDoListFrm"}, app); // Create a form, set the attributes (action, method, id) and append it to the app div
    const listTitleLabel = createEl("label", {}, frm1, "List Title"); // Create a label, append it to the form and set the inner text
    const listTitle = createEl("input", {name: "lsitTitle", "data-label": "List Title", id: "listTitle", value: userListTitle}, listTitleLabel); // Create form input and append it to the label
    const listId = createEl("input", {type: "hidden", value: userListId, name: "listId", id: "listId"}, listTitleLabel); // Create a hidden form input to hold the id of the list
    createEl("button", {class: "btnInline"}, listTitleLabel, "Save Title", {click: saveListTitle}); // Create a button, give it a class, append it to the label, set the inner text and assign it an event handler

    if(userListTitle.length){ // Allow the user to create list items
        const frm2 = createEl("form", {action: "javascript:;", method: "post", id: "toDoListItemFrm"}, app); // Create a form, set the attributes (action, method, id) and append it to the app div
        const listItemLabel = createEl("label", {}, frm2, "To Do"); // Create a label, append it to the form and set the inner text
        const toDo = createEl("input", {name: "toDo", "data-label": "To Do", id: "toDo"}, listItemLabel); // Create form input and append it to the label
        createEl("button", {class: "btnInline"}, frm2, "Save", {click: saveList}); // Create a button, give it a class, append it to the label, set the inner text and assign it an event handler        

        const ul = createEl("ul", {id: "list"}, app); // Create an unordered list to display the each to-do list item in the array

        for(let i = 0; i < userList.length; i++){ // Loop over the array
            let li = createEl("li", {}, ul); // Create a list item and append it to the unordered list        
            let label = createEl("label", {}, li); // Create a label and append it to the list item
            let chkbx = createEl("input", {type: "checkbox", value: i, class: "chk"}, label, "", {click: toggleCompleted}); // Create a checkbox, set the parameters (type, value) and append it to the label 
            let span = createEl("span", {}, label, userList[i][0]); // Create a span, append it to the label and set the inner text
            if(userList[i][1] === 1){ // If the item has been marked as "done", check the checkbox and apply a class to the span that will visually indicate that the item has been completed
                chkbx.setAttribute("checked","checked"); // Check the checkbox
                span.classList.add("strk"); // Add a class to the span
            }
        }        
    }    
}

const setListId = (e) => { // Constant function to set the list Id
    e.preventDefault(); // This function is invoked by clicking on an anchor tag, so prevent the default behaviour
    userListId = e.target.dataset.id; // The list ID is stored in the data-id attribute of the anchor tag
    userList = null; // Ensure that the global variables are reset to null
    userListTitle = null; // Ensure that the global variables are reset to null
    showList(); // Now we have set the list ID, display the list for editing
}

const showDashboard = () => { // Const function to display the dashboard
    const app = document.getElementById("app"); // Target the div with an id of "app"
    app.innerHTML = ""; // Clear any HTML from within the div
    headerButtons(); // Add the header buttons

    createEl("h2", {}, app, "Dashboard"); // Create an H2 heading
    createEl("button", {}, app, "Create A List", {click: showList}); // Create a button to create a new "To-Do" list

    if(!userData.lists.length){ // If the user has not previously saved any lists...
        createEl("p", {class: "frmBtn"}, app, "You do not have any to-do lists. Click the button above to create one."); // ...show a message
    } else { // Show available lists
        createEl("h3", {}, app, "Your To-Do Lists");
        const ol = createEl("ol", {}, app); // Create an ordered list
        for(let i = 0 ; i < userData.lists.length ; i++){ // Loop through the array of "To-Do" lists
            let li = createEl("li", {}, ol); // Create a list item
            let a = createEl("a", {href: "javascript:;", "data-id": i}, li, userData.lists[i].title, {click: setListId}); // Create an "a" tag to link to the specific To-Do list
        }
    }

    userListId = -1; // Reset the user list id
}

const findUser = () => { // Constant function to find a user
    const email = document.getElementById("Email").value.trim(); // Target the email form element and save the trimmed value to a constant
    const userArray = storage.getItem("userArray") !== null ? JSON.parse(storage.getItem("userArray")) : []; // Get the user array from local storage

    const findEmail = (user) => user === email; // Nested function to find email addresses within the userArray array
    return userArray.findIndex(findEmail); // Invoke the nested function to see if the email address exists in the array (return the index within the array if found, -1 if not found)
}

const processSignUp = (e) => { // Constant function to process the signup form
    e.preventDefault(); // Button exists in a form, so prevent the default form submission
    const frm = document.getElementById("signUpForm"); // Target the form with an id of "signUpForm" and save it to a constant
    const validFrm = validateForm(frm); // Validate the sign up form
    
    if(!validFrm){ // If the form is not valid...
        return false; // ...exit this function by returning false
    }

    const userArray = storage.getItem("userArray") !== null ? JSON.parse(storage.getItem("userArray")) : []; // Access the user array and stoe it in a constant
    allUserData = storage.getItem("userData") !== null ? JSON.parse(storage.getItem("userData")) : []; // Update the global userData variable

    const userExists = findUser(); // Check to see if this email address has already been used to sign up

    if(userExists > -1){ // If the email address already has been used to sign up...
        const errorArray = ["There is an account already associated with that email address."]; // ...create an array to hold an appropriate error message
        showError(errorArray); // Pass the array to the showError function to display the error message
        return false; // Stop processing this functiom by returning false
    }
    
    userArray.push(document.getElementById("Email").value.trim()); // Add the email to the user array
    storage.setItem("userArray", JSON.stringify(userArray)); // Store the user array locally
    userIndex = userArray.length - 1; // Update the global variable with the position of the array

    const thisUser = { // Store user date in an object literal
        password: CryptoJS.SHA512(document.getElementById("Pass").value.trim()).toString(), // Store the hashed password
        first: document.getElementById("First").value.trim(), // Store the first name
        last: document.getElementById("Last").value.trim(), // Store the last name
        lists: [], // Create an empty array - used to store the user's To-Do lists
    }

    allUserData.push(thisUser); // Add the user data to the array of users
    storage.setItem("userData",JSON.stringify(allUserData)); // Convert the user data to JSON and store locally

    userData = allUserData[allUserData.length -1]; // Save the user data to a global variable

    showDashboard(); // Invoke function to show the dashboard

}

const processLogIn = (e) => { // Constant function to process a login
    e.preventDefault(); // Button exists in a form, so prevent the default form submission
    const frm = document.getElementById("logInForm"); // Target the form with an id of "logInForm"
    const validFrm = validateForm(frm); // Pass the form to the validateForm function

    if(!validFrm){ // If the form is not valid...
        return false; //...exit this function by returning false
    }

    const thisUserIndex = findUser(); // Check if there is an account associated with this email address

    if(thisUserIndex === -1){ // If the email address has not been used to sign up...
        const errorArray = ["This email address is not associated with an account"]; // ...create an error array and add a message to it
        showError(errorArray); // Display the error
        return false; // exit this function by returning false
    }

    const email = document.getElementById("Email").value.trim(); // Get the value of the email form field
    const pass = CryptoJS.SHA512(document.getElementById("Pass").value.trim()).toString(); // Get the value of the password form field and hash it

    allUserData = JSON.parse(storage.getItem("userData")); // Get user data from local storage and parse the JSON 
    userData = allUserData[thisUserIndex]; // Update the global variable  

    if(userData.password === pass){ // If the user password matches the one on file...
        userIndex = thisUserIndex; // Update the global variable     
        showDashboard(); // Display the dashboard
    }else{ // Password is incorrect
        userData = null; // Reset the userData variable
        const errorArray = ["Username/Password combination is incorrect"]; // Create an array and add an appropriate error message to it
        showError(errorArray); // Pass the array to the showError function to display the error
    }

}

const processUserData = (e) => { // Constant function to process user data (settings)
    e.preventDefault(); // Button exists in a form, so prevent the default form submission
    const frm = document.getElementById("signUpForm"); // Target the form with an id of "logInForm"
    const validFrm = validateForm(frm); // Pass the form to the validateForm function

    if(!validFrm){ // If the form is not valid...
        return false; //...exit this function by returning false
    }

    const userArray = storage.getItem("userArray") !== null ? JSON.parse(storage.getItem("userArray")) : []; // Access the user array and stoe it in a constant
    allUserData = storage.getItem("userData") !== null ? JSON.parse(storage.getItem("userData")) : []; // Update the global userData variable

    const userExists = findUser(); // Check to see if this email address has already been used to sign up

    if(userExists > -1 && userExists !== userIndex){ // If the email address already has been used to sign up by another account...
        const errorArray = ["There is an account already associated with that email address."]; // ...create an array to hold an appropriate error message
        showError(errorArray); // Pass the array to the showError function to display the error message
        return false; // Stop processing this functiom by returning false
    }
    
    userArray[userIndex] = document.getElementById("Email").value.trim(); // Add the email to the user array
    storage.setItem("userArray", JSON.stringify(userArray)); // Store the user array locally

    const thisUser = { // Store user date in an object literal
        password: CryptoJS.SHA512(document.getElementById("Pass").value.trim()).toString(), // Store the hashed password
        first: document.getElementById("First").value.trim(), // Store the first name
        last: document.getElementById("Last").value.trim(), // Store the last name
        lists: userData.lists, // Copy the user's lists from existing stored data
    }

    allUserData[userIndex] = thisUser; // Update user data within the array of users
    storage.setItem("userData",JSON.stringify(allUserData)); // Convert the user data to JSON and store locally

    userData = thisUser;

    showDashboard(); // Invoke function to show the dashboard    
}

const signupScreen = () => { // Constant function to generate HTML for sign up screen
   
    const app = document.getElementById("app"); // Target the div with an id of "app"
    app.innerHTML = ""; // Clear out any HTML from within the div

    if(userIndex !== undefined){
        headerButtons();
    }

    const userArray = JSON.parse(storage.getItem("userArray")); // Get the user array from local storage

    const h2Text = userIndex !== undefined ? "Account Settings" : "Sign Up";
    const firstNameValue = userIndex !== undefined ? userData.first : "";
    const lastNameValue = userIndex !== undefined ? userData.last : "";
    const emailValue = userIndex !== undefined ? userArray[userIndex] : "";
    const btnText = userIndex !== undefined ? "Save Details" : "Sign Up";
    const btnEvent = userIndex !== undefined ? processUserData : processSignUp;

    const h2 = createEl("h2", {}, app, h2Text); // Create an H2 header

    const frm = createEl("form", {method: "post", action: "javascript:;", id: "signUpForm"}, app); // Create a form, set the attributes (method, action, id), append the form to the div

    const firstNameDiv = createEl("div", {}, frm); // Create a div to contain the first name form elements and append it to the form
    const firstNameLabel = createEl("label", {}, firstNameDiv); // Create a label and append it to the div
    const firstNameLabelSpan = createEl("span", {}, firstNameLabel, "First Name"); // Create a span, append it to the label and set the inner text
    const firstNameInput = createEl("input", {type: "text", name: "first", "data-label": "First Name", id: "First", value: firstNameValue}, firstNameLabel); // Create a form input, set the attributes (type, name, data-label, id, value) and append it to the label

    const lastNameDiv = createEl("div", {}, frm); // Create a div to contain the last name form elements and append it to the form
    const lastNameLabel = createEl("label", {}, lastNameDiv); // Create a label and append it to the div
    const lastNameLabelSpan = createEl("span", {}, lastNameLabel, "Last Name"); // Create a span, append it to the label and set the inner text
    const lastNameInput = createEl("input", {type: "text", name: "last", "data-label": "Last Name", id: "Last", value: lastNameValue}, lastNameLabel); // Create a form input, set the attributes (type, name, data-label, id, value) and append it to the label
    
    const emailDiv = createEl("div", {}, frm); // Create a div to contain the email form elements and append it to the form
    const emailLabel = createEl("label", {}, emailDiv); // Create a label and append it to the div
    const emailLabelSpan = createEl("span", {}, emailLabel, "Email"); // Create a span, append it to the label and set the inner text
    const emailInput = createEl("input", {type: "text", name: "email", "data-label": "Email", id: "Email", value: emailValue}, emailLabel); // Create a form input, set the attributes (type, name, data-label, id, value) and append it to the label
    
    const passDiv = createEl("div", {}, frm); // Create a div to contain the password form elements and append it to the form
    const passLabel = createEl("label", {}, passDiv); // Create a label and append it to the div
    const passLabelSpan = createEl("span", {}, passLabel, "Password"); // Create a span and append it to the label and set the inner text
    const passInput = createEl("input", {type: "password", name: "pass", "data-label": "Password", id: "Pass"}, passLabel);// Create a form input, set the attributes (type, name, data-label, id) and append it to the label

    const termsDiv = createEl("div", {}, frm); // Create a div to contain the terms & conditions form elements and append it to the form
    const termsLabel = createEl("label", {}, termsDiv); // Create a label and append it to the div
    const termsLabelSpan = createEl("span", {}, termsLabel, "I agree to the Terms of Use"); // Create a span, append it to the label and set the inner text
    const termsCheck = createEl("input", {type: "checkbox", name: "terms", class: "chk", "data-label": "Terms of Use", id: "Terms"}, termsLabel); // Create a checkbox, set the attributes (type, name, class, data-label, id) and append ot to the label
    if(userIndex !== undefined){
        termsCheck.setAttribute("checked","checked");
    }

    const signUpBtn = createEl("button", {class: "frmBtn"}, frm, btnText, {click: btnEvent} ); // Create a button, set the class, append it to the form, set the inner text and assign an event handler
}

const loginScreen = () => { // Constant function to generate HTML for log in screen

    const app = document.getElementById("app"); // Target the div with an id of "app" and save it to a constant
    app.innerHTML = ""; // Clear out any HTML from within the div

    const h2 = createEl("h2", {}, app, "Log In"); // Create an H2 header, append it to the app div and set the inner text

    const frm = createEl("form", {method: "post", action: "javascript:;", id: "logInForm"}, app); // Create a form, set the form parameters (method, action, id) and append it to the app div

    const emailLabel = createEl("label", {}, frm); // Create a label and append it to the form
    const emailLabelSpan = createEl("span", {}, emailLabel, "Email"); // Create a span, append it to the label and set the inner text
    const emailInput = createEl("input", {type: "text", name: "email", "data-label": "Email", id: "Email"}, emailLabel); // Create an input, set the attributes (type, name, data-label, id) and append it to the label

    const passLabel = createEl("label", {}, frm); // Create a label and append it to the form
    const passLabelSpan = createEl("span", {}, passLabel, "Password"); // Create a span, append it to the label and set the inner text
    const passInput = createEl("input", {type: "password", name: "pass", "data-label": "Password", id: "Pass"}, passLabel); // Create an input, set the attributes (type, name, data-label, id) and append it to the label

    const logInBtn = createEl("button", {class: "frmBtn"}, frm, "Log In", {click: processLogIn}); // Create a button, set the class, append it to the form, set the inner text and assign an event handler
}

const indexScreen = () => { // Constant function to generate HTML for initial screen

    const app = document.getElementById("app"); // Target the div with an id of "app" and save it to a constant
    app.innerHTML = ""; // Clear out any HTML from within the div

    const introTxt = createEl("p", {}, app, "Hello, please select one of the options below"); // Create a paragraph tag containing introductory text
    const logInBtn = createEl("button", {class: "indexBtn"}, app, "Log In", {click: loginScreen});  // Create a button to log in, give it a class, append it to the app div, set the inner text and give it an event handler
    const signUpBtn = createEl("button", {class: "indexBtn"}, app, "Sign Up", {click: signupScreen}); // Create a button to sign up, give it a class, append it to the app div, set the innere text and give it an event handler
}

indexScreen(); // Load the initial screen