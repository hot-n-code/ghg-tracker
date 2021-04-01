import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff-to-delete/Stuff';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import { Users } from '../../api/user/UserCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Make } from '../../api/vehicle/make/Make';
import { AllVehicle } from '../../api/vehicle/AllVehicleCollection';

// User-level publication
Meteor.publish(Stuffs.userPublicationName, () => Stuffs.collection.find());

Meteor.publish(DailyUserData.userPublicationName, function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return DailyUserData.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Users.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Users.collection.find({ email: username });
  }
  return this.ready();
});

Meteor.publish(Vehicle.userPublicationName, function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vehicle.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(UserVehicle.userPublicationName, () => UserVehicle.collection.find());

Meteor.publish(Make.userPublicationName, () => Make.collection.find());

Meteor.publish(AllVehicle.userPublicationName, () => AllVehicle.collection.find());

// Admin-level publication
Meteor.publish(Stuffs.adminPublicationName, () => Stuffs.collection.find());

Meteor.publish(Users.adminPublicationName, () => Users.collection.find());

Meteor.publish(DailyUserData.cumulativePublicationName, () => DailyUserData.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
