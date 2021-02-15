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
    // The name of this collection.
    this.name = 'DailyUserDataCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      date: Date,
      modeOfTransportation: {
        type: String,
        allowedValues: ['Alternative Fuel Vehicle', 'Biking', 'Carpool', 'Electric Vehicle', 'Public Transportation', 'Telework', 'Walking'],
      },
      milesTraveled: Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const DailyUserData = new DailyUserDataCollection();
