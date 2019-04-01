/*
    File name: song.js
    Author: Richard Chappell
    Course: Pirple - Keeping Up With The JavaScripts - Part 1 ES6
    Homework: Lecture 1 - Data Types
*/

//create an object to hold details of the song
var song = {
    songName: "Happy", // String value
    artist: "Pharrell Williams", // String value
    album: "Happy", // String value
    duration: 233, // Numeric value representing the duration of the song in seconds
    isEarWorm: true, // Boolean value
    melancholy: false, // Boolean value
    chartPositions: [
        {
            chart: "UK Singles", // Key = chart, value = "UK Singles"
            position: 1, // Key = position, value = 1
        },
        {
            chart: "US Billboard", // Key = chart, value = "US Billboard"
            position: 1, // Key = position, value = 1
        },
        {
            chart: "Japan Hot 100", // Key = chart, value = "Japan Hot 100"
            position: 5, // Key = position, value = 5
        },
        {
            chart: "Hungary Dance Top 40", // Key = chart, value = "Hungary Dance Top 40"
            position: 4, // Key = position, value = 4
        }
    ], // Array of objects
    credits: {
        writtenBy: "Pharrell Williams", // String value
        producedBy: "Pharrell Williams", // String value
    }, // Object to hold details of the song credits
    copiesSold: 1922000, // Numeric value,
    released: "November 21, 2013", // String value
    recordingYear: 2013, // Numeric value
    formats: ["7 inch", "12 inch", "CD", "Digital Download"], // Array of formats that the song was released in - all string values
}

/* Access and output values of the song object*/

console.log(song.songName); // 'Happy' - string
console.log(song.artist); // 'Pharrell Williams' - string
console.log(song.album); // 'Happy' - string
console.log(song.duration); // 233 - number
console.log(song.isEarWorm); // true - boolean
console.log(song.melancholy); // false - boolean
console.log(song.chartPositions) // Array of objects
console.log(song.chartPositions[0].chart); // Accessing the first object in the array and outputting the value assigned to the "chart" key - "UK Singles" - string
console.log(song.chartPositions[0].position); // Accessing the first object in the array and outputting the value assigned to the "position" key - 1 - number
console.log(song.credits); // Object
console.log(song.credits.writtenBy) // Outputting the value assigned to the "writtenBy" key - 'Pharrell Williams' - string
console.log(song.credits.producedBy) // Outputting the value assigned to the "producedBy" key - "Pharrell Williams" - string
console.log(song.copiesSold) // 1922000 - numnber
console.log(song.released) // "November 21, 2013" - string
console.log(song.recordingYear) // 2013 - number
console.log(song.formats) // Array
console.log(song.formats.length) // Number of items in the array - 4 - number
console.log(song.formats[song.formats.length - 1]) // Accessing the last item in the array - "Digital Download" - string