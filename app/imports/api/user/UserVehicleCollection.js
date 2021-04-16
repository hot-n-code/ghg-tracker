import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';
import { VehicleMakes } from '../vehicle/VehicleMakeCollection';

export const userVehiclePublications = {
  userVehicle: 'UserVehicle',
  userVehicleCumulative: 'UserVehicleCumulative',
};

class UserVehicleCollection extends BaseCollection {
  constructor() {
    super('UserVehicle', new SimpleSchema({
      name: String,
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
    }));
  }

  define({ name, make, model, owner, logo, price, year, MPG, fuelSpending, type }) {
    const docID = this._collection.insert({
      name,
      make,
      model,
      owner,
      logo,
      price,
      year,
      MPG,
      fuelSpending,
      type,
    });
    return docID;
  }

  altDefine({ name, make, model, owner, price, year, MPG, fuelSpending }) {
    const logo = VehicleMakes.find({ make: make }).logo;
    const type = MPG < 0 ? 'EV/Hybrid' : 'Gas';
    const docID = this._collection.insert({
      name,
      make,
      model,
      owner,
      logo,
      price,
      year,
      MPG,
      fuelSpending,
      type,
    });
    return docID;
  }

  update(docID, { name, make, model, logo, price, year, MPG, fuelSpending, type }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (make) {
      updateData.make = make;
    }
    if (model) {
      updateData.model = model;
    }
    if (logo) {
      updateData.logo = model;
    }
    if (_.isNumber(year)) {
      updateData.year = year;
    }
    if (_.isNumber(price)) {
      updateData.price = price;
    }
    if (_.isNumber(MPG)) {
      updateData.MPG = MPG;
    }
    if (_.isNumber(fuelSpending)) {
      updateData.fuelSpending = fuelSpending;
    }
    if (type) {
      updateData.type = type;
    }
    this._collection.update(docID, { $set: updateData });
  }

  altUpdate(docID, { name, make, model, price, year, MPG, fuelSpending }) {
    const updateData = {};
    updateData.logo = VehicleMakes.find({ make: make }).logo;
    updateData.type = MPG < 0 ? 'EV/Hybrid' : 'Gas';
    if (name) {
      updateData.name = name;
    }
    if (make) {
      updateData.make = make;
    }
    if (model) {
      updateData.model = model;
    }
    if (_.isNumber(year)) {
      updateData.year = year;
    }
    if (_.isNumber(price)) {
      updateData.price = price;
    }
    if (_.isNumber(MPG)) {
      updateData.MPG = MPG;
    }
    if (_.isNumber(fuelSpending)) {
      updateData.fuelSpending = fuelSpending;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(userVehiclePublications.userVehicle, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userVehiclePublications.userVehicleCumulative, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeUserVehicle() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userVehiclePublications.userVehicle);
    }
    return null;
  }

  subscribeUserVehicleCumulative() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userVehiclePublications.userVehicleCumulative);
    }
    return null;
  }
}

export const UserVehicles = new UserVehicleCollection();
