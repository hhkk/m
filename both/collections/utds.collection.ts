import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Utd } from '../models/utd.model';

export const Utds = new MongoObservable.Collection<Party>('utds');

function loggedIn() {
  return !!Meteor.user();
  }

Utds.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
