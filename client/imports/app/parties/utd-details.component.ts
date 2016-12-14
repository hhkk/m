import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from "angular2-meteor-accounts-ui";
import { MouseEvent } from "angular2-google-maps/core";

import 'rxjs/add/operator/map';

import { Utds } from '../../../../both/collections/utds.collection';
import { Utd } from '../../../../both/models/utd.model';
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

import template from './utd-details.component.html';
import style from './utd-details.component.scss';

@Component({
  selector: 'utd-details',
  template,
  styles: [ style ]
})
@InjectUser('user')
export class UtdDetailsComponent implements OnInit, OnDestroy {
  utdId: string;
  paramsSub: Subscription;
  utd: Utd;
  utdSub: Subscription;
  users: Observable<User>;
  uninvitedSub: Subscription;
  user: Meteor.User;
  // Default center Palo Alto coordinates.
  // centerLat: number = 37.4292;
  // centerLng: number = -122.1381;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() 
  {
    this.paramsSub = this.route.params
      .map(params => params['utdId'])
      .subscribe(utdId => {
        this.utdId = utdId;
        
        if (this.utdSub) {
          this.utdSub.unsubscribe();
        }

        this.utdSub = MeteorObservable.subscribe('utd', this.utdId).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.utd = Utds.findOne(this.utdId);
            this.getUsers(this.utd);
          });
        });

        if (this.uninvitedSub) {
          this.uninvitedSub.unsubscribe();
        }

        this.uninvitedSub = MeteorObservable.subscribe('uninvited', this.utdId).subscribe(() => {
          this.getUsers(this.utd);
        });
      });
  }

  getUsers(utd: Utd) {
    if (utd) {
      this.users = Users.find({
        _id: {
          // $nin: utd.invited || [],
          $ne: Meteor.userId()
        }
      }).zone();
    }
  }

  saveUtd() {
    if (!Meteor.userId()) {
      alert('Please log in to change this utd');
      return;
    }
    
    Utds.update(this.utd._id, {
      $set: {
        namex: this.utd.namex
        //description: this.utd.description,
        //location: this.utd.location
      }
    });
  }

  invite(user: Meteor.User) {
    MeteorObservable.call('invite', this.utd._id, user._id).subscribe(() => {
      alert('User successfully invited.');
    }, (error) => {
      alert(`Failed to invite due to ${error}`);
    });
  }

  reply(rsvp: string) {
    MeteorObservable.call('reply', this.utd._id, rsvp).subscribe(() => {
      alert('You successfully replied.');
    }, (error) => {
      alert(`Failed to reply due to ${error}`);
    });
  }

  get isOwner(): boolean {
    return this.utd && this.user && this.user._id === this.utd.owner;
  }

  get isPublic(): boolean {
    return this.utd && this.utd.public;
  }

  // get isInvited(): boolean {
  //   if (this.utd && this.user) {
  //     const invited = this.utd.invited || [];
  //
  //     return invited.indexOf(this.user._id) !== -1;
  //   }
  //
  //   return false;
  // }


  // get lat(): number {
  //   return this.utd && this.utd.location.lat;
  // }

  // get lng(): number {
  //   return this.utd && this.utd.location.lng;
  // }

  // mapClicked($event: MouseEvent) {
  //   this.utd.location.lat = $event.coords.lat;
  //   this.utd.location.lng = $event.coords.lng;
  // }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.utdSub.unsubscribe();
    this.uninvitedSub.unsubscribe();
  }
}
