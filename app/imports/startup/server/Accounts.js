import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { readFileSync } from 'fs';

/* eslint-disable no-console */
const randomAccounts = JSON.parse(readFileSync('random-accounts.json'));

function createUser(email, password, role) {
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.isServer) {
    console.log('Initializing database!');
    console.log(randomAccounts);
    randomAccounts.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
    console.log(`   users: ${Meteor.users.find().count()} accounts`);
  } else {
    console.log('Cannot initialize the database! Make sure Meteor is running in server environment');
  }
}
