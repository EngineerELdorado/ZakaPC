import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomPreloader } from './CustomerPreloader';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { ShoppingCartModule } from 'ng-shopping-cart';
import { MyCartItem } from './my-cart-item';
@NgModule({
  declarations: [AppComponent],
  entryComponents:[],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NoopAnimationsModule,
    ToastNoAnimationModule.forRoot(),
    HttpClientModule,
    ShoppingCartModule.forRoot({ // <-- Add the cart module to your root module
      itemType: MyCartItem, // <-- Configuration is optional
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'NgShoppingCart',
        clearOnError: true
      }
    })
  ],
  providers: [CustomPreloader],
  bootstrap: [AppComponent]
})
export class AppModule { }
