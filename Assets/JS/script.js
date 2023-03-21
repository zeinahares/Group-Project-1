// Ask teacher - do we have to use 2 different server side APIS, or only 2 different end points in the API at least?

// Repo Questions:
// how many people should review a pull request before merging? 1 or more?
// how many branches? /feature, /style, /issue?
// code owners?

// Code Questions:
// check out user story & acceptance criteria in README
// JQuery? If not, delete from html
// CSS framework? choose one and delete the other from html 
// alocate css framework? someone to set up at the start, and then everyone contributes as needed?
// we need 2 server side APIs - 2 end points in the URL fetch link i think from same API or 2 different API
// divide all JS functions that we think are needed
// allocate JS functions to each person
// create a skeleton HTML in class

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=d673ee57

var OMDbAPIkey = 'd673ee57';

var requestUrl = 'http://www.omdbapi.com/?s=harry+potter&page=2&apikey=d673ee57'; // t = specific title , s = search title

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });