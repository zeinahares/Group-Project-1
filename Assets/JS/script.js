// Code Questions:
// CSS framework? choose one and delete the other from html 

// TO RAISE:
// NEED AN EXTRA FUNCTION FOR WHAT HAPPENS WHEN WE PRESS THE PRINTED the printed search history

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=d673ee57

var OMDbAPIkey = 'd673ee57';
var OMDbAPIParameter = '&apikey=d673ee57';
var baseURLOMDb = 'http://www.omdbapi.com/?';

var ExamplerequestUrl = 'http://www.omdbapi.com/?i=tt1201607&apikey=d673ee57'; // t = specific title , s = search title, i = id of specific title

fetch(ExamplerequestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


//  HTML - TOM
//  CSS - TOM
//  README - TOM

// ZEINA - event listner print from search history button

// ZEINA - function advent listener for searching movies
// take text from input button + create request URL
// display the list of movie titles

function fetchmoviesList(event) {

  // ADD THUMBS UP

  event.preventDefault();
  var movieInput = $('#search').val();

  if (movieInput.length === 0) {
    return;
  }

  console.log(movieInput);

  var movieQuery = movieInput.replace(/ /g, '+');

  console.log(movieQuery);

  var movieListrequestURL = baseURLOMDb + 's=' + movieQuery + OMDbAPIParameter;

  // remove all inner html of the divs on new search
  $('#movieslist').html("");
  $('#moviepage').html("");

  fetch(movieListrequestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // remove hide attribute from movieslist & hide moviepage
      $('#movieslist').removeClass();
      $('#moviepage').addClass('hide');

      for (i = 0; i < data.Search.length; i++) {

        var posterURL = data.Search[i].Poster;
        console.log(posterURL);
        var movieTitle = data.Search[i].Title;
        var movieYear = data.Search[i].Year;

        var movieID = data.Search[i].imdbID;

        // create a div with .card

        var newCard = $("<div class= 'card'>");
        // div for specific movie now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        newCard.val(movieID);
        // append newCard to row #movieslist
        $('#movieslist').append(newCard);

        // create a title with title & year & append child to div newCard

        var movieTitleEl = $("<span class='card-title'>");

        movieTitleEl.text(movieTitle + ' (' + movieYear + ')');
        // movie title element now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        movieTitleEl.val(movieID);

        newCard.append(movieTitleEl);

        // create img with poster URL & append child to div newCard
        var movieposterEl = $('<img>');
        movieposterEl.attr('src', posterURL);
        // movie poster now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        movieposterEl.val(movieID);

        newCard.append(movieposterEl);
      };

      $('#search').val('');
    });

}

$('#search').on('submit', fetchmoviesList);

// ADD EVENT LISTNER FOR SEARCH BUTTON

$('#search').on('keypress', function (event) {

  // if user presses enter on the page, fetch the movies list

  if (event.keyCode === 13) {
    console.log(event.keyCode);
    fetchmoviesList(event);
  }
});




// SAWAKO = fuction save to local storage from search history
// SAWAKO = function print from local storage

var input = $("#search");
var btn = $("#submit-btn");
var resultContainer = $("#result-container");
var titleList = $("#title-list");
var deleteAllBtn = $("#delete-all-btn");
var titleArr = [];
var storageKey = "Movie Title";

function addTitleBtn() {
  titleList.html("");

  for (var i = 0; i < titleArr.length; i++) {
    var nameOfMovie = titleArr[i];
    var titleBtn = $("<li>");
    titleBtn.text(nameOfMovie);
    titleBtn.attr("data-index", i);

    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.attr("class", "delete-btn");
    // var deleteAllBtn = $("<button>");
    // deleteAllBtn.text("All Clear");
    // deleteAllBtn.attr("class", "delete-All-btn");        
    titleList.append(titleBtn);
    titleBtn.append(deleteBtn);
    // titleBtn.on(“click”, function () {        // })
  }
}

function init() {
  var storedTitle = JSON.parse(localStorage.getItem(storageKey));
  if (storedTitle !== null) {
    titleArr = storedTitle;
  }
  addTitleBtn();
}

function storeTitles() {
  localStorage.setItem(storageKey, JSON.stringify(titleArr));
}

btn.on("click", function (event) {
  event.preventDefault();
  console.log("ok");
  var movieTitle = input.val().trim();
  if (movieTitle === "") {
    return;
  }
  titleArr.push(movieTitle);
  input.val(""); 
  storeTitles();
  addTitleBtn();
});

function handleRemoveItem(event) {
  var btnClicked = $(event.target);

  if (btnClicked.is("button") === true) {
    var index = btnClicked.parent().attr("data-index");
    titleArr.splice(index, 1);
    addTitleBtn();
    storeTitles();
  }
}

function handleRemoveAllItem(event) {
  console.log("delete")
  event.preventDefault();
  titleArr.splice(0);
  titleList.children().remove();
  storeTitles();
  // clear from local storage
} 

titleList.on("click", ".delete-btn", handleRemoveItem);
deleteAllBtn.on("click", handleRemoveAllItem);
init();





// JEISON -
// function 2 advent listener for when click image of the poster
// get id from image clicked
// - -
// hide the previous div / and unhide new div
// and append new items

// OPTIONAL : youtube trailer
// OPTIONAL : thumbs up + save to local storage
// OPTIONAL : display toggle for drop down JQUERY UI