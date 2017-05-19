$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var profilePage;

//render profile page upon login
$.get('views/profile.handlebars', function(source) {
    profilePage = Handlebars.compile(source);
});

});
