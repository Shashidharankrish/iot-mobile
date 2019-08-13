import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {

  submitted = false;
  deviceForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.submitted = false;
    this.deviceForm = this.formBuilder.group({
      deviceName: ['', Validators.required]
    });
  }

  get f() { return this.deviceForm.controls; }

  async onSubmit(){ 
    this.submitted = true;

    if (this.deviceForm.invalid) {
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.deviceService.saveDevice(this.deviceForm.value).subscribe(res => {
      loading.dismiss();
      this.deviceForm.reset(); 
      this.presentSuccess('Device added successfully');
    },
    err => {
        if(err.status ==0 || parseInt(err.status) == 403 ||  parseInt(err.status) == 404){
          console.log(err);
        }else{
          this.presentToast(err.error['message']);
        }   
        loading.dismiss();  
    });
  }

  async presentToast(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    return await toast.present();
  }

  async presentSuccess(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
   
    toast.onDidDismiss().then((r) => {
      this.submitted = false;
      this.deviceForm.reset();      
      this.router.navigate(['/menu/device-list']);
    });

    return await toast.present();
  }

}
