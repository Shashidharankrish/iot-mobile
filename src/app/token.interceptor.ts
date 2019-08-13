import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,  HttpErrorResponse
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  userdetails:any;
  constructor(
    private router: Router,
    public toastController: ToastController,
    private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const authentservice = this.injector.get(AuthenticationService);
      const token = localStorage.getItem('token');
      const mftoken = localStorage.getItem('mftoken');
      this.userdetails = authentservice.getUserPayload();
     // console.log(this.userdetails)
      if (token) {
        request = request.clone({
          setHeaders: {
            'auth-uid':  token,
            'mftoken':  mftoken
          }
        });
      }
    
      // if (!request.headers.has('Content-Type')) {
      //   request = request.clone({
      //     setHeaders: {
      //       'content-type': 'application/json'
      //     }
      //   });
      // }
    
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            //console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if(error.status == 0){
            errorMessage = "No Network: The server cannot be reached.";
            this.presentToast(errorMessage);
           } else if(error.status == 403){
            errorMessage = "Access Denied!";
            this.presentToast(errorMessage);
           } else if(error.status == 404){
            errorMessage = "Not Found Error!";
            this.presentToast(errorMessage);
           }          
         
          return throwError(error);
        }));
    }

    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }

    
}