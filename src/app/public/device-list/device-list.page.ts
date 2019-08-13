import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/models/device';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { filter} from 'rxjs/operators'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {

  orders: Array<any>;
  devices: Device[] = [];
  constructor(
    private deviceService: DeviceService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router) {  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getDevices();
      });
  }

  async getDevices(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    //await loading.present();
    this.deviceService.deviceList().subscribe(res => {
      this.devices = res.devicelist;
      //loading.dismiss();
    },
    err =>{
      if(err.status == 404 || err.status == 0){
        this.presentToast('Serve not rechable');
      }
      //loading.dismiss();
    });
  }
  moveDetails(device){
    this.router.navigate(['/menu/device/',device._id])
  }

  addDevice(){
    this.router.navigate(['/menu/device'])
  }

  async presentToast(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 6000,
      position: 'top',
      color: 'danger'
    });
    return await toast.present();
  }

}
