import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';

class UserCollection {
  constructor() {
    this.name = 'UserCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      image: String,
      createdAt: new Date(),
    }, { tracker: Tracker });

    this.collection.attachSchema(this.schema);
  }

  define(email, password) {
    Accounts.createUser({
      username: email,
      email: email,
      password: password,
    });
  }

  // todo update
  // which fields to update?
  // todo remove
}

export const User = new UserCollection();
