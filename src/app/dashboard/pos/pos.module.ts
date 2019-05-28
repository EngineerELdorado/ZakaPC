import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [PosComponent],
  imports: [
    CommonModule,
    PosRoutingModule,
    MatGridListModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PosModule { }
