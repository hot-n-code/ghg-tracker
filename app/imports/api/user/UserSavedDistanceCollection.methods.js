import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { UserSavedDistances } from './UserSavedDistanceCollection';

export const userSavedDistanceDefineMethod = new ValidatedMethod({
  name: 'UserSavedDistanceCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      return UserSavedDistances.define(definitionData);
    }
    return '';
  },
});

export const userSavedDistanceUpdateMethod = new ValidatedMethod({
  name: 'UserSavedDistanceCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    UserSavedDistances.update(updateData._id, updateData);
    return true;
  },
});

export const userSavedDistanceRemoveItMethod = new ValidatedMethod({
  name: 'UserSavedDistanceCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return UserSavedDistances.removeIt(instance);
  },
});
