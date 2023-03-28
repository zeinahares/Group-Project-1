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

        var favouritesHeart = $('<button class="btn save-btn" type="thumb-up" name="action"><i class="material-icons">favorite</i></button>');
        favouritesHeart.attr("title", movieTitle);
        favouritesHeart.val(movieID);
        favouritesHeart.attr("ID", movieID);

        // favouritesHeart.val(movieID);
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

        var movieTitleEl = $("<h2 class='card-title'>");

        movieTitleEl.text(movieTitle + ' (' + movieYear + ')');
        // movie title element now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        movieTitleEl.val(movieID);

        cardImage.append(movieTitleEl);

        cardImage.append(favouritesHeart);




      };

      $('#search').val('');
      initFavScreen();
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
  var movieQuery = movieInput.replace(/ /g, '+').slice(0, -1);
  console.log(movieQuery);

  var movieListrequestURL = baseURLOMDb + 's=' + movieQuery + OMDbAPIParameter;
  fetchmoviesList(movieListrequestURL);

}


// ZEINA - Rendering HomePage with developer's choices
function renderHomePage() {

  var developerChoices = ['tt0120601', 'tt0822832', 'tt0097814', 'tt0261392'];


  $('#movieslist').html("");
  $('#moviepage').html("");
  var choiceTitle = $('<h2 id="choiceTitle">');
  choiceTitle.text("Developers' Choice");

  $('#movieslist').append(choiceTitle);

  // all requests are nested in one so that they can all load together
  for (var i = 0; i < developerChoices.length; i++) {
    var developerRequestURL = baseURLOMDb + 'i=' + developerChoices[i] + OMDbAPIParameter;

    fetch(developerRequestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var movieTitle = data.Title;
        var movieYear = data.Released;
        var moviePoster = data.Poster;
        var movieID = data.imdbID;;

        var favouritesHeart = $('<button class="btn save-btn" type="thumb-up" name="action"><i class="material-icons">favorite</i></button>');
        favouritesHeart.attr("title", movieTitle);
        favouritesHeart.val(movieID);

        var newCard = $("<div class= 'card'>");
        newCard.val(movieID);

        $('#movieslist').append(newCard);
        var cardImage = $("<div class = 'card-image'>");
        newCard.append(cardImage);
        // create img with poster URL & append child to div newCard
        var movieposterEl = $('<img>');
        movieposterEl.attr('src', moviePoster);
        movieposterEl.val(movieID);

        cardImage.append(movieposterEl);
        cardImage.val(movieID);

        // create a title with title & year & append child to div newCard

        var movieTitleEl = $("<h2 class='card-title'>");
        movieTitleEl.text(movieTitle + ' (' + movieYear + ')');
        // movie title element now contains its ID as a value
        // so when the div is clicked, its value can be retrieved without being seen on the HTML
        movieTitleEl.val(movieID);

        cardImage.append(movieTitleEl);

        cardImage.append(favouritesHeart);
        initFavScreen();
      });

  }

  $('#movieslist').removeClass('hide');
  $('#moviepage').addClass('hide');
  $('#choiceTitle').removeClass('hide');
}

renderHomePage();
// ZEINA - event listner display moviesList from history print
$(document).on('click', '.history_item', historyRequestURL);
$(document).on('click', '.fav-btn', movieClickURL);

$('#home-btn').on('click', renderHomePage);
$(document).on('click', '.fav-btn', movieClickURL);

var titleFavArr = [];
var storageFavKey = "Fav Movie Title";


$(document).on("click", ".delete-fab-btn", function (event) {
  event.stopPropagation();

});

$(document).on("click", "#delete-all-fab-btn", function () {
  var favouritesHeart = $(".save-btn");
  if (favouritesHeart.children().is(".clicked-fav") === true) {
    favouritesHeart.children().removeClass('clicked-fav');
    console.log("ok5?")
  }
});

function addFavBtn() {

  $("#short-list").html("");
  var length = titleFavArr ? titleFavArr.length : 0;

  for (var i = 0; i < length; i++) {
    var favBtn = $("<button class='fav-btn'>");
    var deleteFavBtn = $("<button>");

    favBtn.attr("data-index", i);
    favBtn.text(titleFavArr[i].title);

    var movieID = titleFavArr[i].ID;

    favBtn.val(movieID);
    console.log(favBtn.val());

    deleteFavBtn.text("X");
    deleteFavBtn.attr("class", "delete-fab-btn");

    $("#short-list").append(favBtn);
    favBtn.append(deleteFavBtn);
  }
}
addFavBtn();

function storeFavTitles() {
  localStorage.setItem(storageFavKey, JSON.stringify(titleFavArr));
}

function initFavScreen() {
  var storedFavTitle = JSON.parse(localStorage.getItem(storageFavKey));

  if (storedFavTitle !== null) {
    titleFavArr = storedFavTitle;
    for (let i = 0; i < titleFavArr.length; i++) {
      console.log("HERE!!!", titleFavArr[i].ID)
      var searchedItem = `#${titleFavArr[i].ID}`
      // console.log(searchedItem)
      var hi = $(searchedItem)
      console.log(hi)
      hi.children().addClass("clicked-fav");

      // $(".save-btn").children().removeClass("clicked-fav");

    }
    //for all the titles in the array, add class "clicked-fav"
  }
}

// SAWAKO = fuction save to local storage from search history
// SAWAKO = function print from local storage

var input = $("#search");
var searchBtn = $("#submit-btn");
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

  }
}
addTitleBtn();

function initScreen() {
  var storedTitle = JSON.parse(localStorage.getItem(storageKey));
  if (storedTitle !== null) {
    titleArr = storedTitle;
  }
  addTitleBtn();
}

$(document).ready(function () {

  initScreen();
  initFavScreen();
  addFavBtn();

})

function storeTitles() {
  localStorage.setItem(storageKey, JSON.stringify(titleArr));
}

searchBtn.on("click", function (event) {
  event.preventDefault();
  console.log("ok");
  var movieTitle = input.val().trim();
  if (movieTitle === "") {
    return alert("Input some words belog to a movie title which you want to search.");
  }
  if (titleArr.includes(movieTitle) !== true) {
    titleArr.push(movieTitle);
  }

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
    if (titleArr.includes(movieTitle) !== true) {
      titleArr.push(movieTitle);
    }

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

function handleRemoveFavItem(event) {
  var deleteFabBtnClicked = $(event.target);

  if (deleteFabBtnClicked.is("button") === true) {
    var index = deleteFabBtnClicked.parent().attr("data-index");
    titleFavArr.splice(index, 1);

    addFavBtn();
    storeFavTitles();

    if ($('.save-btn').children().hasClass("clicked-fav")) {
      $('.save-btn').children().removeClass("clicked-fav")
    }

  }
}

function handleRemoveAllFavItem(event) {
  event.preventDefault();
  titleFavArr.splice(0);
  $('#short-list').children().remove();
  storeFavTitles();
}

$('#short-list').on("click", ".delete-fab-btn", handleRemoveFavItem);
$('#delete-all-fab-btn').on("click", handleRemoveAllFavItem);


$(document).on('click', '.save-btn', handleShortList);

function handleShortList(event) {

  event.stopPropagation();
  var thumbClicked = $(event.target);

  if (thumbClicked.is("button") === true) {
    var thumbClickedTitle = thumbClicked.attr("title");
    var thumbClickedId = thumbClicked.attr("ID");

    var favObj = {
      title: thumbClickedTitle,
      ID: thumbClickedId,
    }

    titleFavArr.push(favObj);
    storeFavTitles();
    addFavBtn();




    if (thumbClicked.children().hasClass("clicked-fav")) {
      thumbClicked.children().removeClass("clicked-fav");
      var index = thumbClicked.children().attr("title");
      titleFavArr.splice(index, 1);
      var index2 = thumbClicked.children().attr("ID");
      titleFavArr.splice(index2, 1);

      addFavBtn();
      storeFavTitles();
      console.log("work")

    } else {
      thumbClicked.children().addClass("clicked-fav");

    }

    // for (let i = 0; i < titleFavArr.length; i++) {
    //   console.log("HERE!!!", titleFavArr[i].ID)
    //   var searchedItem = `#${titleFavArr[i].ID}`
    //   // console.log(searchedItem)
    //   var hi = $(searchedItem)
    //   console.log(hi)
    //   hi.children().addClass("clicked-fav");

    //   // $(".save-btn").children().removeClass("clicked-fav");

    // }


    // if (titleFavArr.includes(thumbClickedTitle) === true) {
    //   thumbClicked.children().addClass("clicked-fav");
    // }

  }

}

// JEISON -
// function 2 advent listener for when click image of the poster
// get id from image clicked
// - -
// hide the previous div / and unhide new div

$(document).on('click', '.card-image', movieClickURL);
function movieClickURL() {
  var movieId = $(this).val(); // gives me id
  console.log($(this).val())
  var movieRequestURL = baseURLOMDb + 'i=' + movieId + OMDbAPIParameter;
  printMovie(movieRequestURL)
}
function printMovie(movieRequestURL) {
  fetch(movieRequestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      $("#movieslist").html("");
      $('#moviepage').html("");
      $('#moviepage').removeClass('hide');
      $('#movieslist').addClass('hide');

      var titleMovie = data.Title;
      var yearRelease = data.Released;
      // need to work
      var Ratings = data.Ratings[0].Value;

      var durationMovie = data.Runtime;
      var language = data.Language;
      var descriptionMovie = data.Plot;
      var movieDirector = data.Director;
      var actors = data.Actors;
      var genre = data.Genre;
      var country = data.Country;
      var movieAwards = data.Awards;
      var posterMovie = data.Poster;
      var movieID = data.imdbID;

      var moviePage = $('#moviepage');
      var imgEl = $('<img>');
      var pageCard = $('<div class="titlecard">');
      var titleEl = $('<h2>');
      var title2El = $('<h3>');
      var durationEl = $('<p>');
      var languageEl = $('<p>');
      var pEl = $('<p>');
      var dirEl = $('<p>');
      var actorsEl = $('<p>');
      var genreEl = $('<p>');
      var countryEl = $('<p>');
      var AwardsEl = $('<p>');
      var favouritesHeart = $('<button class="btn save-btn" type="thumb-up" name="action"><i class="material-icons">favorite</i></button>');
      favouritesHeart.val(movieID);
      favouritesHeart.attr("id", movieID);

      moviePage.append(pageCard);

      imgEl.attr('src', posterMovie);

      titleEl.text(titleMovie + ' (' + yearRelease + ')');
      title2El.text('Ratings: ' + Ratings);

      durationEl.text('Duration: ' + durationMovie);
      languageEl.text('Language: ' + language);

      pEl.text('Plot: ' + descriptionMovie);
      dirEl.text('Director: ' + movieDirector + '.');

      actorsEl.text('Actors: ' + actors + '.');
      genreEl.text('Genre: ' + genre + '.');

      countryEl.text('Country: ' + country);
      AwardsEl.text('Awards: ' + movieAwards + '.');

      pageCard.append(imgEl, titleEl, favouritesHeart, title2El, durationEl, languageEl, pEl, dirEl,
        actorsEl, genreEl, countryEl, AwardsEl);

      favouritesHeart.attr("title", titleMovie);
      favouritesHeart.attr("ID", movieID);
      console.log("Jeison")
      initFavScreen();



    });
  // initFavScreen();
}
// and append new items

// OPTIONAL : youtube trailer
// OPTIONAL : thumbs up + save to local storage
// OPTIONAL : display toggle for drop down JQUERY UI