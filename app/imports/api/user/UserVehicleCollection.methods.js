import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { UserVehicles } from './UserVehicleCollection';

export const userVehicleDefineMethod = new ValidatedMethod({
  name: 'UserVehicleCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      return UserVehicles.define(definitionData);
    }
    return '';
  },
});

export const userVehicleUpdateMethod = new ValidatedMethod({
  name: 'UserVehicleCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    UserVehicles.update(updateData._id, updateData);
    return true;
  },
});

export const userVehicleRemoveItMethod = new ValidatedMethod({
  name: 'UserVehicleCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return UserVehicles.removeIt(instance);
  },
});
