import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class VehicleCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VehicleCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema(
      {
        make: String,
        model: String,
        owner: String,
        logo: String,
        price: Number,
        year: Number,
        MPG: Number,
        fuelSpending: Number,
        type: {
          type: String,
          allowedValues: ['Gas', 'EV/Hybrid'],
        },
      },
      { tracker: Tracker },
    );
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Vehicle = new VehicleCollection();
