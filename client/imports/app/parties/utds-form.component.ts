import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

// import { Parties } from '../../../../both/collections/parties.collection';
import { Utds } from '../../../../both/collections/utds.collection';
import { UtdCmd } from '../../../../both/utlities/UtdCmd';

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
      name2: ['', Validators.required],
      public: [false]
    });

  }

  doUtd(): void {
    let utdRawTrim = this.addForm.value.name2.trim();
    let publicInd = this.addForm.value.public;
    //alert('in doUtd utdRawTrim [' + utdRawTrim + ']');
    let utdCmd = new UtdCmd(utdRawTrim, publicInd);
    //alert('in utds-form.component.ts:' + utdCmd.getUtdRawTrim());
    if (!Meteor.userId()) {
      alert('Please log in to do a utd');
      return;
    }

    if (this.addForm.valid)
    {
      try {
        Utds.insert({
          namex: utdCmd.getUtdRawTrim(),
          publicInd: utdCmd.getPublicInd()
        });
        alert('sucessful save:' + utdCmd.getUtdRawTrim())

      } catch (e) {
        alert('errahbk:' + e);
      }
      //this.addForm.reset(); blanks out entered value
    }
  }



  testhbk() {
  }

}
