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

// ZEINA - function advent listener for searching movies
// take text from input button + create request URL
// display the list of movie titles

function fetchmoviesList(event) {

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

$('#search').on('keypress', function (event) {

  // if user presses enter on the page, fetch the movies list

  if (event.keyCode === 13) {
    console.log(event.keyCode);
    fetchmoviesList(event);
  }
});




// SAWAKO = fuction save to local storage from search history

// ZEINA or SAWAKO = function print from local storage

// JEISON -
// function 2 advent listener for when click image of the poster
// get id from image clicked
// - -
// hide the previous div / and unhide new div
// and append new items

// OPTIONAL : youtube trailer
// OPTIONAL : thumbs up + save to local storage
// OPTIONAL : display toggle for drop down JQUERY UI
