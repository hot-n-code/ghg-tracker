import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class UserCollection {
  constructor() {
    this.name = 'UserCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      email: String,
      image: String,
      vehicles: { type: Array, optional: true },
      'vehicles.$': { type: String },
    }, { tracker: Tracker });

    this.collection.attachSchema(this.schema);
  }
}

export const Users = new UserCollection();
