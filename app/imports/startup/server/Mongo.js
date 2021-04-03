import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff-to-delete/Stuff.js';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Users } from '../../api/user/UserCollection';
import { Makes } from '../../api/vehicle/make/MakeCollection';

/* eslint-disable no-console */

const getData = (filename) => JSON.parse(Assets.getText(filename));

// UserCollection
function addUser({ name, goal, email, image }) {
  Users.collection.insert({ name, goal, email, image });
}

if (Users.collection.find().count() === 0) {
  if (Meteor.isServer) {
    console.log('Creating the default profiles');
    getData('defaultUsers.json').map(individualUser => addUser(individualUser));
    console.log(` Number of default profiles created: ${Users.collection.find().count()}`);
  }
}

// MakeCollection
function addMake({ make, logo }) {
  Makes.collection.insert({ make, logo });
}

if (Makes.collection.find().count() === 0) {
  if (Meteor.isServer) {
    console.log('Creating default makes');
    getData('defaultMakes.json').map(makes => addMake(makes));
    console.log(` Number of default makes created: ${Makes.collection.find().count()}`);
  }
}

// VehicleCollection
function addVehicle(vehicle) {
  UserVehicle.collection.insert(vehicle);
}

if (UserVehicle.collection.find().count() === 0) {
  if (Meteor.isServer) {
    console.log('Creating default Vehicle.');
    getData('defaultUserVehicles.json').map(vehicle => addVehicle(vehicle));
    console.log(` Number of default user vehicles created: ${UserVehicle.collection.find().count()}`);
  }
}

// ------------ UNDER CONSTRUCTION ------------ //
/** Initialize the database with a default data document. */
// StuffsCollection
function addData(data) {
  // console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// DailyUserDataCollection
function addDailyUserData(dailyData) {
  // console.log(`  Defining Daily User Data on: ${dailyData.inputDate}`);
  DailyUserData.collection.insert(dailyData);
}

/** Initialize the collection if empty. */
// StuffsCollection
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// DailyUserDataCollection
if (DailyUserData.collection.find().count() === 0) {
  if (Meteor.settings.defaultDailyUserData) {
    console.log('Creating default data.');
    Meteor.settings.defaultDailyUserData.map(dailyData => addDailyUserData(dailyData));
  }
}
