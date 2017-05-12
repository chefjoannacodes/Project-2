// Creating our Event model
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
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

  var EventAttendee = sequelize.define("EventAttendee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Event.hasMany(EventAttendee, {as: 'Attendees'})
  return Event;
};
