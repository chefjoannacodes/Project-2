// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname + "/../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname + "/../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/members.html"));
  });



  function formatDate(date) {
     var result = date.getFullYear() + '-' + 
            (date.getMonth() < 9 ? '0' : '') + 
            (date.getMonth() + 1) + '-' + date.getDate();
    return result;
  }

  app.get("/events", function(req, res) {
    db.Event.findAll({}).then(function(records) {
           
           records = records.map(function(record){
              return {
                  id:record.id,
                  name:record.name,
                  description:record.description,
                  date:formatDate(record.date),
                  type:record.type
              };
           })

           res.render('events', {
              'events': records
            })

    })
 
  });

};
