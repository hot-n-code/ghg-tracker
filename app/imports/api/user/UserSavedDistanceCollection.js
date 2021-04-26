import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';

export const userSavedDistancePublications = {
  userSavedDistance: 'UserSavedDistance',
  userSavedDistanceAdmin: 'UserSavedDistanceAdmin',
};

class UserSavedDistanceCollection extends BaseCollection {
  constructor() {
    super('UserSavedDistance', new SimpleSchema({
      location: String,
      distanceMiles: Number,
      owner: String,
    }));
  }

  define({ location, distanceMiles, owner }) {
    const docID = this._collection.insert({
      location,
      distanceMiles,
      owner,
    });
    return docID;
  }

  update(docID, { location, distanceMiles }) {
    const updateData = {};
    if (location) {
      updateData.location = location;
    }
    if (_.isNumber(distanceMiles)) {
      updateData.distanceMiles = distanceMiles;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(userSavedDistancePublications.userSavedDistance, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(userSavedDistancePublications.userSavedDistanceAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeUserSavedDistance() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userSavedDistancePublications.userSavedDistance);
    }
    return null;
  }

  subscribeUserSavedDistanceAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userSavedDistancePublications.userSavedDistanceAdmin);
    }
    return null;
  }
}

export const UserSavedDistances = new UserSavedDistanceCollection();
