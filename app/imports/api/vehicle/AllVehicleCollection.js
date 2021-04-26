import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';

class AllVehicleCollection extends BaseCollection {
  constructor() {
    super('AllVehicle', new SimpleSchema({
      Year: Number,
      Make: String,
      Model: String,
      Mpg: Number,
    }));
  }

  define({ Year, Make, Model, Mpg }) {
    const docID = this._collection.insert({
      Year,
      Make,
      Model,
      Mpg,
    });
    return docID;
  }

  update(docID, { Year, Make, Model, Mpg }) {
    const updateData = {};
    if (_.isNumber(Year)) {
      updateData.Year = Year;
    }
    if (Make) {
      updateData.Make = Make;
    }
    if (Model) {
      updateData.Make = Model;
    }
    if (_.isNumber(Mpg)) {
      updateData.Mpg = Mpg;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish('AllVehicle', function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeAllVehicle() {
    if (Meteor.isClient) {
      return Meteor.subscribe('AllVehicle');
    }
    return null;
  }
}

export const AllVehicles = new AllVehicleCollection();
