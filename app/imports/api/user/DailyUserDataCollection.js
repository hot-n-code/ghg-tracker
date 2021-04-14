import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * Encapsulates state and variable values for Daily Data collection.
 *
 * Daily Data corresponds to individual data or daily log-in by the user.
 */
class DailyUserDataCollection {
  constructor() {
    this._collectionName = `${this._type}Collection`;
    // The name of this collection.
    this.name = 'DailyUserDataCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      inputDate: Date,
      modeOfTransportation: String,
      milesTraveled: Number,
      modeType: {
        type: String,
        allowedValues: ['Gas', 'EV/Hybrid', 'Alt'],
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.cumulativePublicationName = `${this.name}.publication.admin`;
  }
}

export const DailyUserData = new DailyUserDataCollection();
