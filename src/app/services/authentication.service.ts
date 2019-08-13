import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserLogin } from '../public/user-login';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;
  token:any;
  splittoken:any;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private plt: Platform,
    private storage: NativeStorage,
    private http:HttpClient) {
    
   }


  login(user:UserLogin) {
    return this.http.post(environment.apiBaseUrl + '/users/login', user).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  setTokenData(res) {
    //this.storage.setItem('token', res['token'])
    localStorage.setItem('token', res['token']);
    localStorage.setItem('mftoken', res['mftoken']);
  }

  logout(){
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authenticationState.next(false);
    });
  }

  getToken() {
    this.isLoggedIn=true;
    return localStorage.getItem('token');
    
    // return this.storage.getItem('token').then(
    //   data => {
    //     this.token = data;
    //     if(this.token != null) {
    //       this.isLoggedIn=true;
    //     } else {
    //       this.isLoggedIn=false;
    //     }
    //   },
    //   error => {
    //     this.token = null;
    //     this.isLoggedIn=false;
    //   }
    // );
  }

  handleError(error){
    return throwError(error);
  }

  getUserPayload() {
    
    var tokena = localStorage.getItem('token');
    if (tokena) {
      var userPayload = atob(tokena.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isAuthenticated(){
    if(this.getToken()){
      return true;
    }else{
      return false;
    }
  }

}
