import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
// import { BlockUIModule } from 'ng-block-ui';
import { MAT_DATE_LOCALE } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BlockUIModule } from 'ng-block-ui';
import { MatElementsModule } from '../../mat-elements/mat-elements.module';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [SalesListComponent],
  entryComponents:[],
  providers:[MatDatepickerModule,DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},

    { provide: LOCALE_ID, useValue: "fr-FR" }],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatElementsModule,
        FormsModule,
        ReactiveFormsModule,
        BlockUIModule.forRoot()
  ]
})
export class SalesModule { }
