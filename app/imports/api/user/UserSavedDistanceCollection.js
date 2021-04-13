import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class UserSavedDistanceCollection {
  constructor() {
    this.name = 'UserSavedDistanceCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      location: String,
      distanceMiles: Number,
      owner: String,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const UserSavedDistances = new UserSavedDistanceCollection();
