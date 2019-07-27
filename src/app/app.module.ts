import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { LimitNamePipe } from './limit-name.pipe';
import { SubstringNamePipe } from './substring-name.pipe';
import { ToastrModule } from 'ngx-toastr';
import { InvoiceComponent } from './dashboard/sales/invoice/invoice.component';
import { MatIconModule, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe, CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';
import { DeviceDetectorModule } from 'ngx-device-detector';
@NgModule({
  declarations: [
    AppComponent,
    LimitNamePipe,
    SubstringNamePipe,
    
    
    
  ],
  entryComponents:[],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    NgbModule,
    MatToolbarModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    DeviceDetectorModule.forRoot()
    
  ],
  providers: [DatePipe,
    { provide: MAT_DIALOG_DATA, useValue: {} },],
  bootstrap: [AppComponent]
})
export class AppModule { }
