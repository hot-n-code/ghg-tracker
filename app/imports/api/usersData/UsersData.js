import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 *
 * Daily Data corresponds to individual data or daily log-in by the user.
 */

// Define the Mongo collection.
const UsersData = new Mongo.Collection('UsersData');

// Define the structure of each document in the collection.
const UsersDataSchema = new SimpleSchema({
    usersTelework: Number,
    electricVehicleOwners: Number,
    carpoolUsers: Number,
    publicTransportUsers: Number,
    vehicleMilesReduced: Number,
    ghgSaved: Number,
    gasSaved: Number,
    bikeMilesCombined: Number,
    dateUpdated: Date,
}, { tracker: Tracker });

// Attach the schema to the collection, so all attempts to insert a document are checked against schema.
this.collection.attachSchema(this.schema);
export { UsersData, UsersDataSchema };
