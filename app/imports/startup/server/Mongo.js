import { Meteor } from 'meteor/meteor';
import { readFileSync } from 'fs';
import { Stuffs } from '../../api/stuff-to-delete/Stuff.js';
import { DailyUserData } from '../../api/user/DailyUserDataCollection';
import { UserVehicles } from '../../api/user/UserVehicleCollection';
import { Users } from '../../api/user/UserCollection';
import { VehicleMakes } from '../../api/vehicle/VehicleMakeCollection';
import { AllVehicles } from '../../api/vehicle/AllVehicleCollection';
import { UserSavedDistances } from '../../api/user/UserSavedDistanceCollection';

/* eslint-disable no-console */

const randomData = JSON.parse(readFileSync('random-data.json'));

const getAssetsData = (filename) => JSON.parse(Assets.getText(`default-data/${filename}`));

if (AllVehicles.count() === 0) {
  getAssetsData('defaultAllVehicles.json').map(vehicle => AllVehicles.define(vehicle));
  console.log(`   AllVehicleCollection: ${AllVehicles.count()} vehicles`);
}

if (VehicleMakes.count() === 0) {
  getAssetsData('defaultMakes.json').map(make => VehicleMakes.define(make));
  console.log(`   MakeCollection: ${VehicleMakes.count()} makes`);
}

if (Users.count() === 0) {
  if (randomData.defaultUsers) {
    randomData.defaultUsers.map(individualUser => Users.define(individualUser));
  }
  console.log(`   UserCollection: ${Users.count()} profiles`);
}

if (UserSavedDistances.count() === 0) {
  if (randomData.defaultSavedDistances) {
    randomData.defaultSavedDistances.map(savedDistance => UserSavedDistances.define(savedDistance));
  }
  console.log(`   UserSavedDistanceCollection: ${UserSavedDistances.count()} saved distances`);
}

if (UserVehicles.count() === 0) {
  if (randomData.defaultUserVehicles) {
    randomData.defaultUserVehicles.map(vehicle => UserVehicles.define(vehicle));
    console.log(`   UserVehicleCollection: ${UserVehicles.count()} vehicles`);
  }
}

// ---- to edit after this line ---- //

if (Meteor.isServer) {
  if (DailyUserData.collection.find().count() === 0) {
    randomData.defaultDailyUserData.map(dailyData => DailyUserData.collection.insert(dailyData));
    console.log(`   DailyUserDataCollection: ${DailyUserData.collection.find().count()} daily user data`);
  }

} else {
  console.log('Cannot initialize the database! Make sure Meteor is running in server environment');
}

// ------------ TO DELETE ------------ //
/** Initialize the database with a default data document. */
// StuffsCollection
function addData(data) {
  // console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
// StuffsCollection
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    // console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
