import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { UserSavedDistances } from '../user/UserSavedDistanceCollection';
import { Users } from '../user/UserCollection';
import { DailyUserData } from '../user/DailyUserDataCollection';
import { UserVehicle } from '../user/UserVehicleCollection';

const allCollections = [
    Users,
    UserSavedDistances,
    DailyUserData,
    UserVehicle,
];

export const defineMethod = new ValidatedMethod({
  name: 'BaseCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ collectionName, definitionData }) {
    if (Meteor.isServer) {
      const collection = allCollections.filter(col => col.getCollectionName() === collectionName);
      return collection.define(definitionData);
    }
    return '';
  },
});

export const updateMethod = new ValidatedMethod({
  name: 'BaseCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ collectionName, updateData }) {
    if (Meteor.isServer) {
      const collection = allCollections.filter(col => col.getCollectionName() === collectionName);
      return collection.update(updateData.id, updateData);
    }
    return '';
  },
});

export const removeItMethod = new ValidatedMethod({
  name: 'BaseCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ collectionName, instance }) {
    if (Meteor.isServer) {
      const collection = allCollections.filter(col => col.getCollectionName() === collectionName);
      return collection.removeIt(instance);
    }
    return '';
  },
});
