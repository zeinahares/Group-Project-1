// OMDb API: https://www.omdbapi.com/?i=tt3896198&apikey=d673ee57

var OMDbAPIkey = 'd673ee57';
var OMDbAPIParameter = '&apikey=d673ee57';
var baseURLOMDb = 'https://www.omdbapi.com/?';

var ExamplerequestUrl = 'https://www.omdbapi.com/?i=tt1201607&apikey=d673ee57'; // t = specific title , s = search title, i = id of specific title

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

  fetch(movieListrequestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // remove all inner html of the divs on new search
      $('#movieslist').html("");
      $('#moviepage').html("");

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

        var favouritesButton = $('<button class="btn save-btn" type="thumb-up" name="action">');
        var favouritesHeart = $('<i>')

        favouritesHeart.addClass("material-icons");

        favouritesHeart.text('favorite');
        favouritesButton.append(favouritesHeart);

        favouritesHeart.attr("title", movieTitle);
        favouritesButton.attr("title", movieTitle);

        favouritesHeart.val(movieID);
        favouritesButton.val(movieID);
        favouritesHeart.attr("ID", movieID);
        favouritesButton.attr("ID", movieID);

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

        cardImage.append(favouritesButton);

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

  var developerChoices = ['tt0120601', 'tt0822832', 'tt0097814', 'tt0261392','tt0780536','tt0085794'];

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

        var favouritesButton = $('<button class="btn save-btn" type="thumb-up" name="action">');
        var favouritesHeart = $('<i>')

        favouritesHeart.addClass("material-icons");

        favouritesHeart.text('favorite');
        favouritesButton.append(favouritesHeart);

        favouritesHeart.attr("title", movieTitle);
        favouritesButton.attr("title", movieTitle);

        favouritesHeart.val(movieID);
        favouritesButton.val(movieID);
        favouritesHeart.attr("ID", movieID);
        favouritesButton.attr("ID", movieID);

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

        cardImage.append(favouritesButton);
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

// SAWAKO - Savings/removing to local storage + printing fav movies & search history

var titleFavArr = [];
var storageFavKey = "Fav Movie Title";


$(document).on("click", ".delete-fab-btn", function (event) {
  event.stopPropagation();

});

// function to remove all favourites when clear all in shortlist is pressed
$(document).on("click", "#delete-all-fab-btn", function () {
  var favouritesHeart = $(".save-btn");
  if (favouritesHeart.children().is(".clicked-fav") === true) {
    favouritesHeart.children().removeClass('clicked-fav');
    console.log("ok5?")
  }
});

// function to print all elements in the favoruite titles array
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

// function to set fav array to local storage
function storeFavTitles() {
  localStorage.setItem(storageFavKey, JSON.stringify(titleFavArr));
}

// function to initialise the heart buttons' colors when the pages load
// if the title is stored in shortlist already, make button red
function initFavScreen() {
  var storedFavTitle = JSON.parse(localStorage.getItem(storageFavKey));

  if (storedFavTitle !== null) {
    titleFavArr = storedFavTitle;
    for (let i = 0; i < titleFavArr.length; i++) {
      // console.log("HERE!!!", titleFavArr[i].ID)
      var searchedItem = `#${titleFavArr[i].ID}`
      // console.log(searchedItem)
      var hi = $(searchedItem)
      // console.log(hi)
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

// printing search history array

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

// initialising search history buttons on screen if array is not empty
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

// set search history to local storage
function storeTitles() {
  localStorage.setItem(storageKey, JSON.stringify(titleArr));
}

// event listener to save search history when submit button is pressed
searchBtn.on("click", function (event) {
  event.preventDefault();
  console.log("ok");
  var movieTitle = input.val().trim();
  if (movieTitle === "") {
    return;
    // alert("Input some words belog to a movie title which you want to search.");
  }

  if (titleArr.includes(movieTitle) !== true) {
    titleArr.push(movieTitle);
  }

  input.val("");
  storeTitles();
  addTitleBtn();
});

// event listener to save search history when enter is pressed
input.on("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    console.log("ok");
    var movieTitle = input.val().trim();
    if (movieTitle === "") {
      return;
    }

    if (titleArr.includes(movieTitle) !== true) {
      titleArr.push(movieTitle);
    }

    input.val("");
    storeTitles();
    addTitleBtn();
  }
});

// function to delete search history item using the X next to the search history button
// remove from local storage and page print
function handleRemoveItem(event) {
  event.stopPropagation();
  var btnClicked = $(event.target);

  if (btnClicked.is("button") === true) {
    var index = btnClicked.parent().attr("data-index");
    titleArr.splice(index, 1);
    addTitleBtn();
    storeTitles();
  }
}

// clearing all search history from local storage and page
function handleRemoveAllItem(event) {
  console.log("delete")
  event.stopPropagation();
  titleArr.splice(0);
  titleList.children().remove();
  storeTitles();
}

titleList.on("click", ".delete-btn", handleRemoveItem);
deleteAllBtn.on("click", handleRemoveAllItem);

// remove movie title from shortlist using the X next to its name
// remove from local storange and print on page
function handleRemoveFavItem(event) {
  var deleteFabBtnClicked = $(event.target);

  if (deleteFabBtnClicked.is("button") === true) {
    var index = deleteFabBtnClicked.parent().attr("data-index");

    var IDSaveBtn = `#${titleFavArr[index].ID}`;

    var selectedSaveBtn = $(IDSaveBtn)
    console.log('selected SaveBTn')
    console.log(selectedSaveBtn);

    selectedSaveBtn.children().removeClass("clicked-fav");

    titleFavArr.splice(index, 1);

    addFavBtn();
    storeFavTitles();

  }
}

// remove all shortlist items from local storage and page print
function handleRemoveAllFavItem(event) {
  event.stopPropagation();
  titleFavArr.splice(0);
  $('#short-list').children().remove();
  storeFavTitles();
  $('.save-btn').children().removeClass('clicked-fav');
}

$('#short-list').on("click", ".delete-fab-btn", handleRemoveFavItem);
$('#delete-all-fab-btn').on("click", handleRemoveAllFavItem);


$(document).on('click', '.save-btn', handleShortList);
$(document).on('click', '.material-icons', handleShortList);

// when the heart button is pressed, if its in favoruites, remove class and from local storage
// if not in shortlist, add to shortlist and give it a class

// the heart/favourites button consists of two elements, a button and a material icon
// each element needs to be targeted seperately for the entire button to work
// otherwise clicking on the heart wont save, only clicking on the borders outside of it
function handleShortList(event) {

  event.stopPropagation();
  var thumbClicked = $(event.target);
  console.log('thumb clicked is')
  console.log(thumbClicked);

  console.log("class name is")
  console.log(thumbClicked[0].className);

  var classNames = thumbClicked[0].className
  // check if you're clicking on the heart
  if (classNames.includes("material-icons")) {

    // check if it has clicked fav
    if (!classNames.includes("clicked-fav")) {

      // if not, add clicked fav and push to favArray
      var thumbClickedTitle = thumbClicked.attr("title");

      // var thumbClickedId = thumbClicked.attr("ID");
      var thumbClickedId = thumbClicked.val();

      var favObj = {
        title: thumbClickedTitle,
        ID: thumbClickedId,
      }

      titleFavArr.push(favObj);
      storeFavTitles();
      addFavBtn();

      console.log('material if');

      thumbClicked.addClass("clicked-fav");
      addFavBtn();
      storeFavTitles();

      // if it includes clicked fav
      // remove class and splice from array
    } else if (classNames.includes("clicked-fav")) {
      console.log('clicked fav if');

      thumbClicked.removeClass("clicked-fav");

      var IDClicked = thumbClicked.attr("ID");
      console.log("IDClicked")
      console.log(IDClicked)

      // find the index of the favitem in the array
      for (var i = 0; i < titleFavArr.length; i++) {

        var arrayID = titleFavArr[i].ID;
        console.log('arrayID')
        console.log(arrayID)
        if (IDClicked === arrayID) {
          console.log("found fav item in array at index")
          console.log(i)
          titleFavArr.splice(i, 1);
          storeFavTitles();
          addFavBtn();
        }

      }
      console.log("removed from array and screen using heart")
    }

    // if not clicking on heart, check if you're clicking on the button
  } else if (thumbClicked.is("button") === true) {

    var heartClassNames = thumbClicked[0].children[0].className;
    // if button does not have clicked fav class
    if (!heartClassNames.includes("clicked-fav")) {

      // put movie into fav array and add clicked fav class
      var thumbClickedTitle = thumbClicked.attr("title");

      var thumbClickedId = thumbClicked.attr("ID");

      var favObj = {
        title: thumbClickedTitle,
        ID: thumbClickedId,
      }

      titleFavArr.push(favObj);
      thumbClicked.children().addClass("clicked-fav");
      storeFavTitles();
      addFavBtn();

      // else if heart has clicked-fav, remove class and remove from array
    } else if (heartClassNames.includes("clicked-fav")) {

      thumbClicked.children().removeClass("clicked-fav");

      var IDClicked = thumbClicked.attr("ID");
      console.log("IDClicked")
      console.log(IDClicked)

      // find the index of the favitem in the array
      for (var i = 0; i < titleFavArr.length; i++) {

        var arrayID = titleFavArr[i].ID;
        console.log('arrayID')
        console.log(arrayID)
        if (IDClicked === arrayID) {
          console.log("found fav item in array at index")
          console.log(i)
          titleFavArr.splice(i, 1);
          storeFavTitles();
          addFavBtn();
        }

      }

      console.log("removed from array and screen using button");
    }
  }

}

// JEISON -
// function 2 advent listener for when click image of the poster
// get id from image clicked
// - -
// hide the previous div / and unhide new div

// when the movie title is pressed, fetch the API URL for specfic movie

$(document).on('click', '.card-image', movieClickURL);
function movieClickURL() {
  var movieId = $(this).val(); // gives me id
  console.log($(this).val())
  var movieRequestURL = baseURLOMDb + 'i=' + movieId + OMDbAPIParameter;
  printMovie(movieRequestURL)
}

// print movie elements onto new page
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

      var durationEl = $('<p>');
      var languageEl = $('<p>');
      var pEl = $('<p>');
      var dirEl = $('<p>');
      var actorsEl = $('<p>');
      var genreEl = $('<p>');
      var countryEl = $('<p>');
      var AwardsEl = $('<p>');

      var favouritesButton = $('<button class="btn save-btn" type="thumb-up" name="action">');
      var favouritesHeart = $('<i>')

      favouritesHeart.addClass("material-icons");

      favouritesHeart.text('favorite');
      favouritesButton.append(favouritesHeart);

      favouritesHeart.attr("title", titleMovie);
      favouritesButton.attr("title", titleMovie);

      favouritesHeart.val(movieID);
      favouritesButton.val(movieID);
      favouritesHeart.attr("ID", movieID);
      favouritesButton.attr("ID", movieID);

      moviePage.append(pageCard);

      imgEl.attr('src', posterMovie);

      titleEl.text(titleMovie + ' (' + yearRelease + ')');

      durationEl.text('Duration: ' + durationMovie);
      languageEl.text('Language: ' + language);

      pEl.text('Plot: ' + descriptionMovie);
      dirEl.text('Director: ' + movieDirector + '.');

      actorsEl.text('Actors: ' + actors + '.');
      genreEl.text('Genre: ' + genre + '.');

      countryEl.text('Country: ' + country);
      AwardsEl.text('Awards: ' + movieAwards + '.');

      // the append is now split into two so that the ratings can go inbetween the heart button
      // and the duration
      pageCard.append(imgEl, titleEl, favouritesButton);

      // Ratings sometimes is not an array
      // if not array save results differently
      if (Array.isArray(data.Ratings)) {
        console.log('Rating is an array');

        // and sometimes its an Array of 0
        // if so, skip appending this element
        if (data.Ratings.length != 0) {
          var Ratings = data.Ratings[0].Value;
          var title2El = $('<h3>');
          title2El.text('Ratings: ' + Ratings);
          pageCard.append(title2El);

        }

      } else if (data.Ratings.Value) {
        var Ratings = data.Ratings.Value;
        console.log('Rating is NOT an array');
        var title2El = $('<h3>');
        title2El.text('Ratings: ' + Ratings);
        pageCard.append(title2El);

      }

      pageCard.append(durationEl, languageEl, pEl, dirEl, actorsEl, genreEl, countryEl, AwardsEl);

      favouritesHeart.attr("title", titleMovie);
      favouritesHeart.attr("ID", movieID);
      console.log("Jeison")
      initFavScreen();
    })
}