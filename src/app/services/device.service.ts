import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + 'd');

  constructor(private http: HttpClient) { }

  saveDevice(device){
    return this.http.post(environment.apiBaseUrl + '/device', device).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  saveDeviceType(device){
    return this.http.post(environment.apiBaseUrl + '/device/type', device).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  deviceList():  Observable<any>{
    return this.http.get(environment.apiBaseUrl + '/device').pipe(
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  device(id): any {
    return this.http.get(environment.apiBaseUrl + '/device/' + id).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  deviceTypeList():  Observable<any>{
    return this.http.get(environment.apiBaseUrl + '/device/type').pipe(
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  assignDevice(deviceinfo){
    return this.http.post(environment.apiBaseUrl + '/device/assigndevice', deviceinfo).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  parameterList():  Observable<any>{
    return this.http.get(environment.apiBaseUrl + '/device/parameters').pipe(
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  getDeviceInfoById(deviceid){
    return this.http.get(environment.apiBaseUrl + '/device/assigndevice').pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  handleError(error){
    return throwError(error);
  }
}
