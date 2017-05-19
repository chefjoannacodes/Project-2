// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
      //home needs to be present for menu to be highlighted
      //user presence will drive either profile or login menu option
      res.render('index', {user:req.user, home:true})
  });

  app.get("/contact", function(req, res) {
      //contact needs to be present for menu to be highlighted
      //user presence will drive either profile or login menu option

      res.render('contact', {user:req.user, contact:true})
  });

  app.get("/pub", function(req, res) {
    //pub needs to be present for menu to be highlighted
    //user presence will drive either profile or login menu option

      res.render('pub', {user:req.user, pub:true})
  });

  app.get("/profile",function( req,res) {
     //profile needs to be present for menu to be highlighted
    //user presence will drive either profile or login menu option
   
    res.render('profile',{user:req.user, profile:true})
  });


  //add books route
  app.get("/books",function( req,res) {
    //books needs to be present for menu to be highlighted
    //user presence will drive either profile or login menu option

    res.render('books',{user:req.user, books:true})
  });

  app.get("/login", function(req, res) {

      var landingPage = req.query.landingPage;

      if(! landingPage) {
          landingPage = "/profile"
      }
     //login needs to be present for menu to be highlighted
     //user presence will drive either profile or login menu option

      res.render('login', {'landingPage':landingPage, user:req.user, login:true})
  });


    app.get("/signup", function(req, res) {
        res.render('signup', {user:req.user})
    });

  // // Here we've add our isAuthenticated middleware to this route.
  // // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname + "/../public/members.html"));
  // });
  //

  app.get("/events", function(req, res) {
    //if user is not login first redirect to login page
    if (!req.user) {
      res.redirect("/login?landingPage=/events");
      return;
    }

    var data;
    db.Event.findAll({
       include: [
            { model: db.EventAttendee, as: 'Attendees', include: [{model: db.User, as: 'User'}]}
       ],
        order: [
            // Will escape username and validate DESC against a list of valid direction parameters
            ['date', 'DESC']
        ],
        limit: 10 //return only no more then most recent events.
    }).then(function(records) {
         //tranform data from database to only filed needed by web page template
          data = records.map(function(record){
             var attendees = record.Attendees.map(function(attendee){
                 return attendee.mapAttendee();
             });
             return record.mapEvent(req.user, attendees)
           });

    }).done(function() {
      res.render('events', {
          'events': data, user:req.user
            })
    })
 
  });

};
