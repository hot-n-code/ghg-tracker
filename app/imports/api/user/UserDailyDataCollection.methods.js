import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { UserDailyData } from './UserDailyDataCollection';

export const userDailyDataDefineMethod = new ValidatedMethod({
  name: 'UserDailyDataCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      return UserDailyData.define(definitionData);
    }
    return '';
  },
});

export const userDailyDataUpdateMethod = new ValidatedMethod({
  name: 'UserDailyDataCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    UserDailyData.update(updateData._id, updateData);
    return true;
  },
});

export const userDailyDataRemoveItMethod = new ValidatedMethod({
  name: 'UserDailyDataCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return UserDailyData.removeIt(instance);
  },
});
