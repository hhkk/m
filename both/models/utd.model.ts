import { CollectionObject } from './collection-object.model';

export interface Utd extends CollectionObject {
  namex: string;
  public: boolean;
}

interface RSVP {
  userId: string;
  response: string;
}

interface Location {
  name: string;
  lat?: number;
  lng?: number;
}