console.log("we are connected!");
$("#submit-btn").on("click", function(event) {
  inputName = $("#search").val().trim();
  console.log("The input name", inputName);
  googleBooks(inputName);
});



 var googleBookAPIKey = "AIzaSyAPQTPn9RkP5J0bDERUohJTPpKP8A9XOJU";

var inputName = "";
console.log(inputName);

function googleBooks(inputName) {
  <!-- event.preventDefault(); -->
  var URL = "https://www.googleapis.com/books/v1/volumes?q=" + inputName + "intitle:keyes&key=AIzaSyAPQTPn9RkP5J0bDERUohJTPpKP8A9XOJU";
  console.log(inputName);
  console.log("all books", URL);

 
 

  <!-- //Performing an AJAX GET request to our qURL -->

  $.ajax({
    url: URL,
    method: "GET"
  })
.done( function handleResponse(response) {
      for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i]; 

       <!--  // in production code, item.text should have the HTML entities escaped. -->
        var title = document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
        var authors = document.getElementById("authors").innerHTML += "<br>" + item.volumeInfo.authors;
        var link =document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.selfLink;
        console.log("========================");
        console.log("title: ", title);
        console.log("authors: ", authors);
        console.log("link: ", link);
        console.log("response: ", response);
      }
    })
  };

googleBooks(inputName);