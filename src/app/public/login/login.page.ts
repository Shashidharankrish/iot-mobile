import { Component, OnInit } from '@angular/core';

import { UserLogin } from '../user-login';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLogin = new UserLogin();
  constructor(
    private  authService:  AuthenticationService,
    private alertService: AlertService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private  router:  Router) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/menu/userlist']);
    }
  }

  async login(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    this.authService.login(this.userLogin).subscribe((res)=>{
      if(res['status'] == true){
        loading.dismiss();
        this.authService.setTokenData(res);
        this.router.navigateByUrl('menu/userlist');
      }else{
        loading.dismiss();
      }      
    },
    err => {
      loading.dismiss();
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

}
