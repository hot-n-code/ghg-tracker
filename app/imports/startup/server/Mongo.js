import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Users } from '../../api/user/UserCollection';
import { Make } from '../../api/make/Make';
import { AllVehicle } from '../../api/vehicle/AllVehicleCollection';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addDailyUserData({ owner, inputDate, modeOfTransportation, milesTraveled, cO2Reduced }) {
  console.log(`  Defining Daily User Data (${owner})`);
  DailyUserData.collection.insert({ owner, inputDate, modeOfTransportation, milesTraveled, cO2Reduced });
}

/** Initialize the collection if empty. */
if (DailyUserData.collection.find().count() === 0) {
  if (Meteor.settings.defaultDailyUserData) {
    console.log('Creating default data.');
    Meteor.settings.defaultDailyUserData.map(userData => addDailyUserData(userData));
  }
}

/** Initialize the database with a default data document. */
function addVehicle({
  make,
  model,
  owner,
  logo,
  price,
  year,
  MPG,
  fuelSpending,
  type,
}) {
  console.log(`Defining vehicle ${owner}`);
  Vehicle.collection.insert({
    make,
    model,
    owner,
    logo,
    price,
    year,
    MPG,
    fuelSpending,
    type,
  });
}

/** Initialize the collection if empty. */
if (Vehicle.collection.find().count() === 0) {
  if (Meteor.settings.defaultVehicle) {
    console.log('Creating default Vehicle.');
    Meteor.settings.defaultVehicle.map(vehicle => addVehicle(vehicle));
  }
}

/** Initialize the database with a default data document. */
function addUser({ name, goal, email, image, vehicles }) {
  console.log(`Defining profile ${email}`);
  Users.collection.insert({ name, goal, email, image });
  // Add interests and projects.
  vehicles.map(vehicle => UserVehicle.collection.insert({ user: email, model: vehicle }));
}

/** Initialize the collection if empty. */
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUser) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultUser.map(user => addUser(user));
  } else {
    console.log(
      'Cannot initialize the database!  Please invoke meteor with a settings file.',
    );
  }
}

function addMake(data) {
  console.log(`Defining make ${data.make}`);
  Make.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Make.collection.find().count() === 0) {
  if (Meteor.settings.defaultMakes) {
    console.log('Creating default make.');
    Meteor.settings.defaultMakes.map(data => addMake(data));
  }
}

/** Initialize the database with a default data document. */
function addAllVehicle({ Year, MMake, Model, Mpg }) {
  console.log(`Defining all vehicle ${MMake}`);
  AllVehicle.collection.insert({ Year, MMake, Model, Mpg });
}

/** Initialize the collection if empty. */
if (AllVehicle.collection.find().count() === 0) {
  if (Meteor.settings.Vehicles) {
    console.log('Creating default Vehicle.');
    Meteor.settings.Vehicles.map(vehicle => addAllVehicle(vehicle));
  }
}
