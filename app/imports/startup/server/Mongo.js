import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff-to-delete/Stuff.js';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Users } from '../../api/user/UserCollection';
import { Makes } from '../../api/vehicle/make/MakeCollection';
import { AllVehicle } from '../../api/vehicle/AllVehicleCollection';
import { readFile } from 'fs';

/* eslint-disable no-console */

readFile('random-data.json', (err, read) => {
  if (err) throw err;
  console.log(JSON.parse(read));
});

const getData = (filename) => JSON.parse(Assets.getText(`default-data/${filename}`));

if (Meteor.isServer) {
  if (Users.collection.find().count() === 0) {
    getData('defaultUsers.json').map(individualUser => Users.collection.insert(individualUser));
  }

  if (Makes.collection.find().count() === 0) {
    getData('defaultMakes.json').map(makes => Makes.collection.insert(makes));
  }

  if (UserVehicle.collection.find().count() === 0) {
    getData('defaultUserVehicles.json').map(vehicle => UserVehicle.collection.insert(vehicle));
  }

  if (DailyUserData.collection.find().count() === 0) {
    getData('defaultDailyUserData.json').map(dailyData => DailyUserData.collection.insert(dailyData));
  }

  if (AllVehicle.collection.find().count() === 0) {
    getData('defaultAllVehicles.json').map(vehicle => AllVehicle.collection.insert(vehicle));
  }

  console.log(`   UserCollection: ${Users.collection.find().count()} profiles`);
  console.log(`   MakeCollection: ${Makes.collection.find().count()} makes`);
  console.log(`   UserVehicleCollection: ${UserVehicle.collection.find().count()} vehicles`);
  console.log(`   DailyUserDataCollection: ${DailyUserData.collection.find().count()} daily user data`);
  console.log(`   AllVehicleCollection: ${AllVehicle.collection.find().count()} vehicles`);
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
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
