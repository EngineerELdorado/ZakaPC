import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToraPos';

  constructor(private deviceService: DeviceDetectorService){
    let deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if(isMobile){
      window.location.replace("https://play.google.com/store/apps/details?id=app.eldonets.torapos");
    }
  }

}
