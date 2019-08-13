import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { DeviceType } from 'src/app/models/deviceType';

@Component({
  selector: 'app-devicetype',
  templateUrl: './devicetype.page.html',
  styleUrls: ['./devicetype.page.scss'],
})
export class DevicetypePage implements OnInit {

  @ViewChild('f') 
    private form;
  submitted = false;
  deviceTypeForm: FormGroup;
  parameters: any;
  range: any = {};
  deviceModel:DeviceType;
  devicetypename: string =''; 
  constructor(
    private formbuilder: FormBuilder,
    public toastController: ToastController,
    private deviceService: DeviceService
  ) { 
    this.deviceModel = <DeviceType>{};
  }

  ngOnInit() {
    // this.deviceTypeForm = this.formbuilder.group({
    //   devicetype: ['', Validators.required]
    // });

    this.getParameters();
  }

  onSubmit(){
    this.deviceModel.range = this.range;
    this.deviceService.saveDeviceType(this.deviceModel).subscribe( res =>{ 
      this.resetForm();     
      this.presentSuccess('Record added successfully.');
    },
    err => {
      console.log(err)
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
      duration: 3000,
      position: 'top',
      color: 'success'
    });
   
    return await toast.present();
  }

  getParameters(){
    this.deviceService.parameterList().subscribe(res => {
      this.parameters = res.list;
      this.setRange();
    },
    err => {
      this.presentToast(err.error.message);
    });
  }

  setRange() {
    this.parameters.forEach(item => {
        this.range[item.key] = {'low': '', 'high': ''};
    });    
  }

  resetForm(){
    this.form.reset(true);
  }
}
