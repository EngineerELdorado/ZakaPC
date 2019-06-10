import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos/pos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { SubstringNamePipe } from './substring-name.pipe';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [PosComponent, SubstringNamePipe],
  imports: [
    CommonModule,
    PosRoutingModule,
    MatGridListModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class PosModule { }
