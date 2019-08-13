import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.page.html',
  styleUrls: ['./userdetail.page.scss'],
})
export class UserdetailPage implements OnInit {

  userId: String;
  user ={
    first_name:null,
    last_name: null,
    email: null
  };
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserById();
  }

  async getUserById(){
      
      if(this.route.snapshot.paramMap.get('userid') == 'null'){
        this.presentAlertConfirm('You are not choosing an item from the list');
      }else{
        const loading = await this.loadingController.create({
          message: 'Loading...'
        });
        await loading.present();
        this.userId = this.route.snapshot.paramMap.get('userid');
        this.userService.userById(this.userId).subscribe(res =>{ 
          this.user = res;
          loading.dismiss();
        },
        err => { console.log(err.status)
          if(err.status != 0){
            this.presentToast(err.error.message);
          }          
          loading.dismiss();
        });
      }     
   
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/menu/userdetail']);
          }
        }
      ]
    });  
    await alert.present();
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

  async delete(id) {
     this.deleteAlertConfirm('Are you sure want to Delete ?', id);    
  }
  

  async deleteAlertConfirm(msg: string, userid) {
    var _this = this;
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
            text: 'Yes',
            handler: async function() {              
              const loading = await _this.loadingController.create({
                message: 'Loading...'
              });
              await loading.present();
              await _this.userService.deleteUser(userid)
                .subscribe(res => {
                  loading.dismiss();
                  _this.presentSuccess('Record Deleted successfully.');
                  _this.router.navigate(['/menu/userlist']);
                }, err => {
                  console.log(err)
                  loading.dismiss();
                });
            }
        }

      ]
    });  
    await alert.present();
  }


  async presentSuccess(displayMessage) {
    const toast = await this.toastController.create({
      message: displayMessage,
      duration: 3000,
      position: 'top',
      color: 'success'
    });
   
    toast.onDidDismiss().then((r) =>{  
      this.router.navigate(['/menu/userlist']);
    });
    return await toast.present();
  }
  

}
