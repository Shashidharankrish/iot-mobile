import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-device-deatils',
  templateUrl: './device-deatils.page.html',
  styleUrls: ['./device-deatils.page.scss'],
})
export class DeviceDeatilsPage implements OnInit {

  deviceId: String;
  device = {
    deviceName:''
  };
  constructor(
      private route: ActivatedRoute,
      private deviceService: DeviceService
    ) {  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.deviceId = params['deviceid'];
      this.deviceService.device(this.deviceId).subscribe(res =>{
        this.device = res.row;
      });
    });
    
  }

}
