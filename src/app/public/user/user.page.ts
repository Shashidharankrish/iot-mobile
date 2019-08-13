import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  submitted = false;
  userForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.userForm = this.formbuilder.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required,Validators.minLength(1)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(5)]],
          confirmpassword: ['', [Validators.required, Validators.minLength(5)]]
        }, {
            validator: this.MustMatch('password', 'confirmpassword')
        });
  }

  MustMatch(controlName: string, matchingControlName: string) { 
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  get f() { return this.userForm.controls; }

  async onSubmit(){ 
      this.submitted = true;
      if(!this.userForm.valid){
        return false;
      }
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.userService.saveUser(this.userForm.value).subscribe(res => {  
        this.submitted = false;     
        loading.dismiss();
        this.presentSuccess('User added successfully');
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
      duration: 3000,
      position: 'top',
      color: 'success'
    });
   
    toast.onDidDismiss().then((r) => {
      this.submitted = false;
      this.userForm.reset();      
      this.router.navigate(['/menu/userlist']);
    })

    return await toast.present();
  }

}
