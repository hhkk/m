import { Component } from '@angular/core';
import { PaginationService } from 'ng2-pagination';

import template from './utds-list.component.html';
import style from './utds-list.component.scss';

import {UtdsList} from "../shared-components/utds-list.class";

@Component({
  selector: 'utds-list',
  template,
  styles: [ style ]
})
export class UtdsListComponent extends UtdsList {
  constructor(paginationService: PaginationService) {
    super(paginationService);
  }
}
