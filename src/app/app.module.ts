import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomPreloader } from './CustomerPreloader';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastNoAnimationModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  entryComponents:[],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NoopAnimationsModule,
    ToastNoAnimationModule.forRoot(),
    HttpClientModule
  ],
  providers: [CustomPreloader],
  bootstrap: [AppComponent]
})
export class AppModule { }
