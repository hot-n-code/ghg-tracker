import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff-to-delete/Stuff.js';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Users } from '../../api/user/UserCollection';
import { Make } from '../../api/vehicle/make/Make';
import { AllVehicle } from '../../api/vehicle/AllVehicleCollection';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
// StuffsCollection
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// DailyUserDataCollection
function addDailyUserData(dailyData) {
  console.log(`  Defining Daily User Data on: ${dailyData.inputDate}`);
  DailyUserData.collection.insert(dailyData);
}

// VehicleCollection
function addVehicle(vehicle) {
  console.log(`  Defining vehicle ${vehicle.owner}`);
  UserVehicle.collection.insert(vehicle);
}

// UserCollection
function addUser({ name, goal, email, image, password }) {
  console.log(`  Defining profile ${email}`);
  Users.collection.insert({ name, goal, email, image, password });
}

// MakeCollection
function addMake(data) {
  console.log(`  Defining make ${data.make}`);
  Make.collection.insert(data);
}

// AllVehicleCollection
function addAllVehicle(vehicle) {
  console.log(`  Defining all vehicle ${vehicle.make}`);
  AllVehicle.collection.insert(vehicle);
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

// VehicleCollection
if (UserVehicle.collection.find().count() === 0) {
  if (Meteor.settings.defaultVehicle) {
    console.log('Creating default Vehicle.');
    Meteor.settings.defaultVehicle.map(vehicle => addVehicle(vehicle));
  }
}

// UserCollection
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUser) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultUser.map(individualUser => addUser(individualUser));
  }
}

// MakeCollection
if (Make.collection.find().count() === 0) {
  if (Meteor.settings.defaultMakes) {
    console.log('Creating default make.');
    Meteor.settings.defaultMakes.map(makes => addMake(makes));
  }
}

// AllVehicleCollection
if (AllVehicle.collection.find().count() === 0) {
  if (Meteor.settings.Vehicles) {
    console.log('Creating default Vehicle.');
    Meteor.settings.Vehicles.map(vehicle => addAllVehicle(vehicle));
  }
}
