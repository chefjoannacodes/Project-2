var User = require('./user.js');

// Creating our EventAttendee model
module.exports = function (sequelize, DataTypes) {


    const EventAttendee = sequelize.define("EventAttendee", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    var user = User(sequelize, DataTypes);
    EventAttendee.belongsTo(user, {as: 'User', foreignKey: 'user_id'});


    // mapAttendee maps attende into imple map to be used by UI template
    EventAttendee.Instance.prototype.mapAttendee = function () {
        return {
            event_id: this.event_id,
            user_id: this.user_id,
            status: this.status,
            comments: this.comments,
            user: {
                id: this.User.id,
                name: this.User.name
            }
        }
    };
    return EventAttendee;
};
