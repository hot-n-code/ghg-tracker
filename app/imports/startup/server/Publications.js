import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff-to-delete/Stuff';
import { DailyUserData } from '../../api/user/DailyUserDataCollection';
import { Users } from '../../api/user/UserCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Makes } from '../../api/vehicle/make/MakeCollection';
import { AllVehicle } from '../../api/vehicle/AllVehicleCollection';
import { UserSavedDistances } from '../../api/user/UserSavedDistanceCollection';

UserSavedDistances.publish();

// ---- to edit after this line --- //
// User-level publication
Meteor.publish(DailyUserData.userPublicationName, function () {
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

Meteor.publish(UserVehicle.userPublicationName, function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserVehicle.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Makes.userPublicationName, () => Makes.collection.find());

Meteor.publish(AllVehicle.userPublicationName, () => AllVehicle.collection.find());

// Admin-level publication
Meteor.publish(Users.adminPublicationName, () => Users.collection.find());

Meteor.publish(DailyUserData.cumulativePublicationName, () => DailyUserData.collection.find());

Meteor.publish(UserVehicle.adminPublicationName, () => UserVehicle.collection.find());

Meteor.publish(Makes.adminPublicationName, () => Makes.collection.find());

Meteor.publish(AllVehicle.adminPublicationName, () => AllVehicle.collection.find());

// ------------ TO DELETE ------------ //
// User-level publication
Meteor.publish(Stuffs.userPublicationName, () => Stuffs.collection.find());

// Admin-level publication
Meteor.publish(Stuffs.adminPublicationName, () => Stuffs.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
