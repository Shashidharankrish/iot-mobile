import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.page.html',
  styleUrls: ['./useredit.page.scss'],
})
export class UsereditPage implements OnInit {
  submitted:boolean = false;
  userForm: FormGroup;
  _id: any ='';
  firstName: String = '';
  lastName: String = '';
  constructor(
    private ngZone: NgZone,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getUserByid(this.route.snapshot.params['userid']);
    this.userForm = this.formbuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required,Validators.minLength(1)]]
      //email: ['', [Validators.required, Validators.email]]
    });
  }

  async getUserByid(id){
    if(this.route.snapshot.paramMap.get('userid') == 'null') {
      this.presentAlertConfirm('You are not choosing an item from the list');
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.userService.userById(id)
        .subscribe(data => { 
          this._id = data._id;
          this.userForm.setValue({
            firstName: data.first_name,
            lastName: data.last_name
          });
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }
  }

  async onFormSubmit(form:NgForm) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await this.userService.updateUser(this._id, form)
      .subscribe(res => {
        loading.dismiss();
        this.presentSuccess('User updated successfully');
          this.router.navigate([ '/menu/userlist' ]);
        }, (err) => {
          this.presentToast(err.error.message);
          loading.dismiss();  
          console.log(err);
        }
      );
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });
  
    await alert.present();
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
   
    toast.onDidDismiss().then((r) =>{
      this.submitted = false;
      this.userForm.reset();      
      this.router.navigate(['/menu/userlist']);
    })

    return await toast.present();
  }

}
