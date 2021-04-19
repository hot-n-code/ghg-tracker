import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { UserVehicles } from './UserVehicleCollection';
import { UserSavedDistances } from './UserSavedDistanceCollection';
import { UserDailyData } from './UserDailyDataCollection';
import { userVehicleRemoveItMethod } from './UserVehicleCollection.methods';
import { userDailyDataRemoveItMethod } from './UserDailyDataCollection.methods';
import { userSavedDistanceRemoveItMethod } from './UserSavedDistanceCollection.methods';

export const userPublications = {
  user: 'User',
  userAdmin: 'UserAdmin',
  userCumulative: 'UserCumulative',
};

class UserCollection extends BaseCollection {
  constructor() {
    super('User', new SimpleSchema({
      name: String,
      goal: String,
      email: String,
      image: String,
    }));
  }

  define({ name, goal, email, image }) {
    const docID = this._collection.insert({
      name,
      goal,
      email,
      image,
    });
    return docID;
  }

  update(docID, { name, goal, image }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (goal) {
      updateData.goal = goal;
    }
    if (image) {
      updateData.image = image;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(id) {
    const doc = this.findDoc(id);
    check(doc, Object);
    const userVehicles = UserVehicles.find({ owner: doc.email }).fetch();
    userVehicles.forEach(function (vehicle) {
      userVehicleRemoveItMethod.call(vehicle._id);
    });
    const userDailyData = (UserDailyData.find({ owner: doc.email })).fetch();
    userDailyData.forEach(function (dailyData) {
      userDailyDataRemoveItMethod.call(dailyData._id);
    });
    const userSavedDistances = (UserSavedDistances.find({ owner: doc.email })).fetch();
    userSavedDistances.forEach(function (savedDistance) {
      userSavedDistanceRemoveItMethod.call(savedDistance._id);
    });
    this._collection.remove(doc._id);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(userPublications.user, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ email: username });
        }
        return this.ready();
      });

      Meteor.publish(userPublications.userAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });

      Meteor.publish(userPublications.userCumulative, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeUser() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.user);
    }
    return null;
  }

  subscribeUserAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userAdmin);
    }
    return null;
  }

  subscribeUserCumulative() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userCumulative);
    }
    return null;
  }
}

export const Users = new UserCollection();
