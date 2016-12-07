import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Parties } from '../../../../both/collections/parties.collection';
import { Utds } from '../../../../both/collections/utds.collection';

import template from './utds-form.component.html';

@Component({
  selector: 'utds-formx',
  template
})
export class UtdsFormComponent implements OnInit {
  addForm: FormGroup;
  images: string[] = [];
  hbkemail: string;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.hbkemail = 'fdfdfdfd';
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      utd: ['', Validators.required]
    });
  }

  testhbk() {
    this.hbkemail = 'fdfdfdfd2';
    alert ('in testhbk');
    this.hbkemail = 'fdfdfdfd3';

    var t = 'ggg';
    Parties.insert({
      name: t,
      description: t,
      location: t,
      owner: Meteor.userId()
    });
    Utds.insert({
      name: t,
      description: t,
      location: t,
      owner: Meteor.userId()
    });
  }

}
