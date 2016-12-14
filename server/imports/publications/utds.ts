import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

// import { Parties } from '../../../both/collections/parties.collection';
import {Utds} from "../../../both/collections/utds.collection";

interface Options {
  [key: string]: any;
}

console.log('in utds.ts &&&&&&&&&&&&&&&&&&&&&');
// hbkhbk Meteor.publish('utds', function(options: Options, location?: string) {
Meteor.publish('utds', function(options: Options, location?: string) {
  console.log('in utds.ts PUBLISH!!!!!!!!!!!!!!! ');
  const selector = buildQuery.call(this, null, location);

  Counts.publish(this, 'numberOfUtds', Utds.collection.find(selector), { noReady: true });

  return Utds.find(selector, options);
});

Meteor.publish('utd', function(utdId: string) {
  return Utds.find(buildQuery.call(this, utdId));
});


function buildQuery(utdId?: string, location?: string): Object {
  const isAvailable = {
    $or: [{
      // utd is public
      public: true
    },
    // or
    {
      // current user is the owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    },
    {
      $and: [
        { invited: this.userId },
        { invited: { $exists: true } }
      ]
    }]
  };

  if (utdId) {
    return {
      // only single utd
      $and: [{
          _id: utdId
        },
        isAvailable
      ]
    };
  }

  const searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };

  return {
    $and: [{
        'location.name': searchRegEx
      },
      isAvailable
    ]
  };
}