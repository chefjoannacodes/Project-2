
$(document).ready(function() {
//     $(".results").hide();
         // .blur();


//to clear the google results
// $(".results").each(function() {
//     this.value = '';
// });

// $('.results').each(function() {
//     $(this).val($(this).find('.results').val());
// };

// $(".results").replaceWith("");

$("#search").val("");

$("#submit-btn").on("click", function(event) {
    event.preventDefault();
    $(".results").show();


    
    inputName = $("#search").val().trim();
    // console.log("The input name", inputName);
    googleBooks(inputName);
});




var googleBookAPIKey = "AIzaSyAPQTPn9RkP5J0bDERUohJTPpKP8A9XOJU";

var inputName = "";
console.log(inputName);

function googleBooks(inputName) {
    // event.preventDefault();
    var URL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + inputName + "&key=AIzaSyAPQTPn9RkP5J0bDERUohJTPpKP8A9XOJU";
    console.log(inputName);
    console.log("all books", URL);




    // <!-- //Performing an AJAX GET request to our qURL -->

    $.ajax({
            url: URL,
            method: "GET"
        })
        .done(function handleResponse(response) {
            var bookPhoto;
            var textSnippet;
            var bookTitle;
            var bookPreview;
            var item;
            var newTitle;
            var author;
            var link;
            var imgURL;
            

            for (var i = 0; i < response.items.length; i++) {
                item = response.items[i];
                newTitle = item.volumeInfo.title;
                console.log("item", item);
                console.log("new title", newTitle);
                author = response.items[i].volumeInfo.authors;
                link = response.items[i].selfLink;

                // $("#content").append(newTitle + " " + "=======");
                // $("#authors").append(author);
                // $("#link").append(link);


                bookPhoto = item.volumeInfo.imageLinks.thumbnail;
               textSnippet = response.items[i].volumeInfo.description;
                bookTitle = response.items[i].volumeInfo.title;
                bookPreview = response.items[i].volumeInfo.previewLink;


                var outerDiv = $("<div class='outerDiv' style='background-color:red' id=container" + i + ">");
                var titleDiv = $("<div class='titleDiv' style='background-color:blue' id=title" + i + ">");
                var authorDiv = $("<div class='authorDiv' style='background-color:black' id=author" + i + ">");
                var snippetDiv = $("<div class='snippetDiv' style='background-color:orange' id=snippet" + i + ">");
                 var imageDiv = $("<div class='imageDiv'" + i + ">");
                // $("body").append(outerDiv);
                $(".results").append(outerDiv);
                $(outerDiv).append([titleDiv, imageDiv, snippetDiv, bookPreview]);
                $(titleDiv).append(newTitle + "\n" + "\n" + '<br/>' + author );
                // $(authorDiv).append(author);

                $(imageDiv).append(bookPhoto)
                $(snippetDiv).append(textSnippet);

                // var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", bookPhoto);
          console.log("bookPhoto", bookPhoto);

          // Appending the image
          imageDiv.append(image);


          //      $("#content")
          // .append(
          //   "<h3 class='title'><span class='label label-primary'>" +
          //   newTitle + "</span><strong> " +
          //   author + "</strong></h3>"
          // );



            }


            console.log("===================")

        })
};

googleBooks(inputName);

$("#clear-all").on("click", function() {
  item = 0;
  $(".results").empty();
});

}); //document ready close
