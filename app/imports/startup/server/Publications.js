import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/user/UserCollection';
import { UserVehicles } from '../../api/user/UserVehicleCollection';
import { VehicleMakes } from '../../api/vehicle/VehicleMakeCollection';
import { AllVehicles } from '../../api/vehicle/AllVehicleCollection';
import { UserSavedDistances } from '../../api/user/UserSavedDistanceCollection';
import { UserDailyData } from '../../api/user/UserDailyDataCollection';

const allCollections = [
  AllVehicles,
  VehicleMakes,
  Users,
  UserVehicles,
  UserDailyData,
  UserSavedDistances,
];

allCollections.forEach((collection) => collection.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
