console.log("we are connected!");


$("#submit-btn").on("click", function(event) {
 event.preventDefault();

 $("#content").empty();
  inputName = $("#search").val().trim();
  console.log("The input name", inputName);
  googleBooks(inputName);
});


 

 var googleBookAPIKey = "AIzaSyAPQTPn9RkP5J0bDERUohJTPpKP8A9XOJU";

var inputName = "";
console.log(inputName);

function googleBooks(inputName) {
  <!-- event.preventDefault(); -->
  var URL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + inputName + "&key=AIzaSyAPQTPn9RkP5J0bDERUohJTPpKP8A9XOJU";
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
        var newTitle = response.items[i].volumeInfo.title;
        console.log("item", item);
        console.log("new title", newTitle);
        var author = response.items[i].volumeInfo.authors;
        var link = response.items[i].volumeInfo.selfLink;

      $("#content").prepend(newTitle + " " + "=======");
      $("#authors").append(author);
      $("#content").append(link);



}

      
       console.log("===================")
      
    })
  };

googleBooks(inputName);