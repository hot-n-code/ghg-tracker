import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Users } from '../../api/user/UserCollection';

/* eslint-disable no-console */

function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

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
function addDailyUserData(userData) {
  console.log(`  Adding: ${userData.modeOfTransportation} (${userData.owner})`);
  DailyUserData.collection.insert(userData);
}

/** Initialize the collection if empty. */
if (DailyUserData.collection.find().count() === 0) {
  if (Meteor.settings.defaultDailyUserData) {
    console.log('Creating default data.');
    Meteor.settings.defaultDailyUserData.map(userData => addDailyUserData(userData));
  }
}

function addVehicle({ make, model, owner, logo, price, year, MPG, fuelSpending, type }) {
  console.log(`Defining vehicle ${owner}`);
  Vehicle.collection.insert({ make, model, owner, logo, price, year, MPG, fuelSpending, type });
}

/** Initialize the collection if empty. */
if (Vehicle.collection.find().count() === 0) {
  if (Meteor.settings.defaultVehicle) {
    console.log('Creating default Vehicle.');
    Meteor.settings.defaultVehicle.map(vehicle => addVehicle(vehicle));
  }
}

function addUser({ firstName, lastName, email, image, vehicles, role }) {
  console.log(`Defining profile ${email}`);
  Users.collection.insert({ firstName, lastName, email, image });
  // Add interests and projects.
  createUser(email, role);
  vehicles.map(vehicle => UserVehicle.collection.insert({ user: email, model: vehicle }));
}

/** Initialize the collection if empty. */
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUser) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultUser.map(user => addUser(user));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
