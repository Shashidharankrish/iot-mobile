import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { filter} from 'rxjs/operators'
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit, OnDestroy {

  users:Array<any>;
  constructor(
    private userService: UserService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getUsers();
      });     
  }

  async getUsers() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    //await loading.present();
    await this.userService.getUsers()
      .subscribe(res => { 
        this.users = res;
        //loading.dismiss();
      }, err => {
        console.log(err);
        if(err.status == 404 || err.status == 0){
          this.presentToast('Serve not rechable');
        }
        //loading.dismiss();
      });
  }


  addUser(){
    this.router.navigate(['/menu/user'])
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

  moveDetails(user){
    this.router.navigate(['/menu/userdetail',user._id]);
  }

  ngOnDestroy(){}

  

}
