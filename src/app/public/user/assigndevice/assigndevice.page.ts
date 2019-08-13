import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { DeviceService } from 'src/app/services/device.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-assigndevice',
  templateUrl: './assigndevice.page.html',
  styleUrls: ['./assigndevice.page.scss'],
})
export class AssigndevicePage implements OnInit {
   
  assigndeviceForm: FormGroup;
  users = [];
  devicetypes = [];
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private deviceService: DeviceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.assigndeviceForm = this.formbuilder.group({
      users: ['', Validators.required],
      deviceName: ['', Validators.required]
    });
    this.getUsers();
    this.getDeviceTypeList();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {      
        this.users = res;
    },
    err => {
      if(err.status == 0 || parseInt(err.status) == 403 ||  parseInt(err.status) == 404){
        console.log(err);
      }else{
        this.presentToast(err.error['message']);
      } 
    });
  }

  getDeviceTypeList(){
    this.deviceService.deviceTypeList().subscribe(res => {      
        this.devicetypes = res.devicetypelist;
    },
    err => {
      if(err.status ==0 || parseInt(err.status) == 403 ||  parseInt(err.status) == 404){
        console.log(err);
      }else{
        this.presentToast(err.error['message']);
      } 
    });
  }

  onSubmit(){  
    this.deviceService.assignDevice(this.assigndeviceForm.value).subscribe(res => {
      this.presentSuccess('Record saved successfully');
    },
    err =>{
      if(err.status ==0 || parseInt(err.status) == 403 ||  parseInt(err.status) == 404){
        console.log(err);
      }else{
        this.presentToast(err.error['message']);
      } 
    });
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

  async presentSuccess(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    return await toast.present();
  }

}
