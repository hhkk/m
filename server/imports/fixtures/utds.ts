//import { Parties } from '../../../both/collections/parties.collection';
//import { Party } from '../../../both/models/party.model';
import { Utds } from '../../../both/collections/utds.collection';
import { Utd } from '../../../both/models/utd.model';

export function loadUtds() {
  if (Utds.find().cursor.count() === 0) {
    const utds: Utd[] = [{
      namex: 'Dubstep-Free Zone',
      //description: 'Can we please just for an evening not listen to dubstep.',
      //location: {
//        name: 'Palo Alto'
//      },
      public: true
    }, {
      namex: 'All dubstep all the time',
      //description: 'Get it on!',
      //location: {
//        name: 'Palo Alto'
//      },
      public: true
    }, {
      namex: 'Savage lounging',
      //description: 'Leisure suit required. And only fiercest manners.',
      //location: {
      //  name: 'San Francisco'
      //}
      //,
      public: false
    }];

    utds.forEach((utd: Utd) => Utds.insert(utd));
  }
}