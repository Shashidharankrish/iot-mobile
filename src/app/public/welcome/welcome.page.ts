import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private router: Router,
    private  authService:  AuthenticationService,
    private navCtrl: NavController) { }

  // ionViewWillEnter() { console.log('herhe')
  //   this.authService.getToken().then(() => {
  //     if(this.authService.isLoggedIn) {
  //       this.navCtrl.navigateRoot('/dashboard');
  //     }
  //   });
  // }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/menu/userlist']);
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }
}
