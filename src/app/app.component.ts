import { Component, PLATFORM_ID, Inject  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ToraPos';

  constructor(
    @Inject(PLATFORM_ID) private platform: Object){
    if (isPlatformBrowser(this.platform)) {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
      window.location.replace("https://play.google.com/store/apps/details?id=app.eldonets.torapos");
    }
  }
}

}
