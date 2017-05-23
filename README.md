# Rose City Book Pub; Great reads and brews all in one place.

## App Description:
This site was built for a client who is opening a bookstore/ Pub in Portland in 2018. They requested a site which would be interactive and would help gather interest in the buisness.


## Technologies Used
- Node and Express Web Server
- MySQL Database with Sequelize ORM
- Handlebars for web templating
- Get and Post routes for retrieving and adding new data
- Passport.js for authentication
- bcrypt for password encryption
- bootstrap for mobile responsiveness

## Code Explanation
This site displays information about the bookstore/bar and also allows users who log in to create a books wishlist and add events to the bookstores calendar.

The books page and events are features accessable only through login. 
- app.get("/events", function(req, res) {
    //if user is not logged in, redirect to login page
    if (!req.user) {
      res.redirect("/login?landingPage=/events");
      return;
    }



