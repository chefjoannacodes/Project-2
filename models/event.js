var eventAttendee = require('./event_attendee.js');


var weekday = ["Sunday", "Monday",  "Tuesday",  "Wednesday",
    "Thursday",  "Friday",  "Saturday"];

var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


function formatShortDate(date) {
    return  monthNames[date.getMonth()] + ' ' + date.getDate() +', '  + weekday[date.getDay()] + ' at ' + date.getHours();
}



// Creating our Event model
module.exports = function(sequelize, DataTypes) {
  const Event = sequelize.define("Event", {
    // id of the event
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    // event name
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    // event description
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    // event date
    date: {
      type: DataTypes.DATE,
      allowNull: false      
    },
    // event type 
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  
  });




  var EventAttendee = eventAttendee(sequelize, DataTypes);
  Event.hasMany(EventAttendee, {as: 'Attendees',  foreignKey:'event_id'});



    // mapEvent maps event into with with simple map to be used by UI template
    //It takes currently loged in used, and list of attendees
    Event.Instance.prototype.mapEvent = function(user, attendees) {

        //assign login user to attendee
        var attendee = {};
        for(var i = 0; i < attendees.length;i++) {
            if(attendees[i].user_id == user.id) {
                attendee = attendees[i];
            }
        }

        var result =  {
            id: this.id,
            name: this.name,
            description: this.description,
            type: this.type,
            user: user,
            shortDate: formatShortDate(this.date),
            date: this.date,
            attendees: attendees,
            attendee: attendee,
        };
        //status helper for mustache so that for instance if else can be implemented with  {{#maybe}} {{/maybe}}  {{#attend}} {{/attend}}
        if(attendee && attendee.status) {
            result[attendee.status] = true
        }
        return result
    };


  return Event;
};
