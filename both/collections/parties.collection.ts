import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Party } from '../models/party.model';

export const Parties = new MongoObservable.Collection<Party>('parties');
console.log ('in parties.collection.ts');
function loggedIn() {
  return !!Meteor.user();
  }

Parties.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
