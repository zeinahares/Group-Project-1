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

// ZEINA - function for searching and displaying list of movies
function fetchmoviesList(movieListrequestURL) {
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
      $('#movieslist').removeClass('hide');
      $('#moviepage').addClass('hide');
      $('#choiceTitle').addClass('hide');

      for (i = 0; i < data.Search.length; i++) {

        var posterURL = data.Search[i].Poster;
        // console.log(posterURL);
        var movieTitle = data.Search[i].Title;
        var movieYear = data.Search[i].Year;

        var movieID = data.Search[i].imdbID;

        var favouritesHeart = $('<button class="btn" type="thumb-up" name="action"><i class="material-icons">favorite</i></button>');

        // create a div with .card

        var newCard = $("<div class= 'card'>");
        // div for specific movie now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        newCard.val(movieID);
        // append newCard to row #movieslist
        $('#movieslist').append(newCard);

        var cardImage = $("<div class = 'card-image'>");

        newCard.append(cardImage);

        // create img with poster URL & append child to div newCard
        var movieposterEl = $('<img>');
        movieposterEl.attr('src', posterURL);
        // movie poster now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        movieposterEl.val(movieID);

        cardImage.append(movieposterEl);
        cardImage.val(movieID);

        // create a title with title & year & append child to div newCard

        var movieTitleEl = $("<span class='card-title'>");

        movieTitleEl.text(movieTitle + ' (' + movieYear + ')');
        // movie title element now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        movieTitleEl.val(movieID);

        cardImage.append(movieTitleEl);

        cardImage.append(favouritesHeart);
      };

      $('#search').val('');
    });

}

// ZEINA - function to create moviesList reuquest URL from search input
function moviesSearchRequestURL(event) {

  event.preventDefault();
  var movieInput = $('#search').val();

  if (movieInput.length === 0) {
    return;
  }
  console.log(movieInput);

  var movieQuery = movieInput.replace(/ /g, '+');
  console.log(movieQuery);

  var movieListrequestURL = baseURLOMDb + 's=' + movieQuery + OMDbAPIParameter;
  fetchmoviesList(movieListrequestURL);
}

$('#submit-btn').on('click', moviesSearchRequestURL);
$('#search').on('submit', moviesSearchRequestURL);

$('#search').on('keypress', function (event) {

  // if user presses enter on the page, fetch the movies list
  if (event.keyCode === 13) {
    console.log(event.keyCode);
    moviesSearchRequestURL(event);
  }
});


// ZEINA - function to create movieListrequestURL from pressing on search history
function historyRequestURL() {

  var movieInput = $(this).text();
  console.log(movieInput);

  // slice off X at the end of input + change any space to +
  var movieQuery = movieInput.replace(/ /g, '+').slice(0,-1);
  console.log(movieQuery);

  var movieListrequestURL = baseURLOMDb + 's=' + movieQuery + OMDbAPIParameter;
  fetchmoviesList(movieListrequestURL);

}

// ZEINA - event listner display moviesList from history print
$(document).on('click', '.history_item', historyRequestURL);


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
    var titleBtn = $("<button class='history_item'>");
    titleBtn.text(nameOfMovie);
    titleBtn.attr("data-index", i);

    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.attr("class", "delete-btn");
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

input.on("keypress", function (event) {
  if (event.keyCode === 13) {
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
  }
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
}

titleList.on("click", ".delete-btn", handleRemoveItem);
deleteAllBtn.on("click", handleRemoveAllItem);
init();

// JEISON -
// function 2 advent listener for when click image of the poster
// get id from image clicked
// - -
// hide the previous div / and unhide new div


$(document).on('click', '.card-image', movieClickURL);


function movieClickURL () {
var movieId = $(this).val(); // gives me id 
  console.log($(this).val()) 

  var movieRequestURL = baseURLOMDb + 'i=' + movieId + OMDbAPIParameter;
  printMovie(movieRequestURL)
}

function printMovie (movieRequestURL){
  fetch (movieRequestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    $('#moviepage').html("");

    $('#moviepage').removeClass('hide');
    $('#movieslist').addClass('hide');

    var titleMovie = data.Title;
    var yearRelease = data.Released;
    var Ratings = data.Ratings[0].Value;
    var durationMovie = data.Runtime;
    var language = data.Language;
    var descriptionMovie = data.Plot;
    var movieDirector = data.Director;
    var actors = data.Actors;
    var genre = data.Genre;
    var country = data.Country;
    var movieAwards = data.Awards;


    const moviePage= document.getElementById('moviepage') 
    var pageCard= $('<div class=card>')
    var titleEl= $('<h2>');
    var subTitelEl=$('<h3>');
    var pEl= $('<p>');
    var brEl= $('<br>');

    $(moviePage).append(pageCard)
    $(pageCard).append(titleEl, pEl)
    $(titleEl).append(titleMovie)
    $(subTitelEl).append(yearRelease,brEl,Ratings, brEl, durationMovie, brEl,
      language)
    $(pEl).append(descriptionMovie,brEl,movieDirector,actors,brEl,
      genre,country,movieAwards)

  });


}



// and append new items

// OPTIONAL : youtube trailer
// OPTIONAL : thumbs up + save to local storage
// OPTIONAL : display toggle for drop down JQUERY UI