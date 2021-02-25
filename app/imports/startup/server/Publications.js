import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Users } from '../../api/user/UserCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { Make } from '../../api/make/Make';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(DailyUserData.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return DailyUserData.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Users.userPublicationName, () => Users.collection.find());

Meteor.publish(Vehicle.userPublicationName, () => Vehicle.collection.find());

Meteor.publish(UserVehicle.userPublicationName, () => UserVehicle.collection.find());

Meteor.publish(Make.userPublicationName, () => Make.collection.find());

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(DailyUserData.adminPublicationName, function () {
  if (this.userId) {
    return DailyUserData.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
