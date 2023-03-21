// Code Questions:
// CSS framework? choose one and delete the other from html 


// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=d673ee57

var OMDbAPIkey = 'd673ee57';

var requestUrl = 'http://www.omdbapi.com/?i=tt1201607&apikey=d673ee57'; // t = specific title , s = search title

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


//  HTML - TOM
//  CSS - TOM
//  README - TOM

// ZEINA - search function advent listener for
// take text from input button + create request URL
// display the list of movie titles // appending

// SAWAKO = fuction save to local storage from search history

// ZEINA - function print from local storage

// JEISON -
// function 2 advent listener for when click image of the poster
// get id from image clicked
// - -
// hide the previous div / and unhide new div
// and append new items

// OPTIONAL : youtube trailer
// OPTIONAL : thumbs up + save to local storage
// OPTIONAL : display toggle for drop down JQUERY UI
