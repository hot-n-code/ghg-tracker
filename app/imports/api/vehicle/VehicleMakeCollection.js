import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

class VehicleMakeCollection extends BaseCollection {
  constructor() {
    super('VehicleMake', new SimpleSchema({
      make: String,
      logo: String,
    }));
  }

  define({ make, logo }) {
    const docID = this._collection.insert({
      make,
      logo,
    });
    return docID;
  }

  update(docID, { make, logo }) {
    const updateData = {};
    if (make) {
      updateData.make = make;
    }
    if (logo) {
      updateData.Make = logo;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish('VehicleMake', function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeVehicleMake() {
    if (Meteor.isClient) {
      return Meteor.subscribe('VehicleMake');
    }
    return null;
  }
}

export const VehicleMakes = new VehicleMakeCollection();
