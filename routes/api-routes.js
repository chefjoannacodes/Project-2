// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Sequelize = require('sequelize');


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      name :req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  
  // GET route for getting all of the events
  app.get("/api/events" , function(req, res){
    // findAll returns all entries for a table when used with no options
    db.Event.findAll({
    }).then(function(events) {
       // We have access to the events as an argument inside of the callback function
        res.json(events);
    });
  })


app.get("/api/events/:id" , function(req, res){
    // findAll returns all entries for a table when used with no options
    console.log(req.body);
    db.Event.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(event) {
       // We have access to the events as an argument inside of the callback function
        res.json(event);
    });
  })



// POST route for saving a new event
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a name, descripton 
    // and date property (req.body)
    db.Event.create({
      name: req.body.name,
      description: req.body.description,
      date: req.body. date,
      type: req.body.type
    }).then(function(event) {
      // We have access to the new event as an argument inside of the callback function
      res.json(event);
    }).catch(Sequelize.ValidationError, function (err) {
      console.log("Failed to create event "  +err);
    });

  })
// PUT route for updating event. We can get the updated event data from req.body
  app.put("/api/events/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Event.update({
      name: req.body.name,
      description: req.body.description,
      date: req.body. date
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(events) {
      res.json(events);
    });
  });
// DELETE route for deleting event. We can get the id of the event to be deleted from
  // req.params.id
  app.delete("/api/events/:id", function(req, res) {
    // We just have to specify which event we want to destroy with "where"
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(events) {
      res.json(events);
    });

  });



};
