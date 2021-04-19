import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';

export const userDailyDataPublications = {
  userDailyData: 'UserDailyData',
  userDailyDataCumulative: 'UserDailyDataCumulative',
};

class UserDailyDataCollection extends BaseCollection {
  constructor() {
    super('UserDailyData', new SimpleSchema({
      owner: String,
      inputDate: Date,
      modeOfTransportation: String,
      milesTraveled: Number,
      modeType: {
        type: String,
        allowedValues: ['Gas', 'EV/Hybrid', 'Alt'],
      },
    }));
  }

  define({ owner, inputDate, modeOfTransportation, milesTraveled, modeType }) {
    const docID = this._collection.insert({
      owner,
      inputDate,
      modeOfTransportation,
      milesTraveled,
      modeType,
    });
    return docID;
  }

  update(docID, { inputDate, modeOfTransportation, milesTraveled, modeType }) {
    const updateData = {};
    if (inputDate) {
      updateData.inputDate = inputDate;
    }
    if (modeOfTransportation) {
      updateData.modeOfTransportation = modeOfTransportation;
    }
    if (_.isNumber(milesTraveled)) {
      updateData.milesTraveled = milesTraveled;
    }
    if (modeType) {
      updateData.modeType = modeType;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(userDailyDataPublications.userDailyData, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(userDailyDataPublications.userDailyDataCumulative, () => instance._collection.find());
    }
  }

  subscribeUserDailyData() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userDailyDataPublications.userDailyData);
    }
    return null;
  }

  subscribeUserDailyDataCumulative() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userDailyDataPublications.userDailyDataCumulative);
    }
    return null;
  }
}

export const UserDailyData = new UserDailyDataCollection();
