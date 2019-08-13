import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user){
    return this.http.post(environment.apiBaseUrl + '/users', user).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  getUsers(): Observable<any[]>{
    return this.http.get <any[]>(environment.apiBaseUrl + '/users').pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }
  
  userById(id): any {
    return this.http.get(environment.apiBaseUrl + '/users/' + id).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  deleteUser(userid): Observable<any>{
      return this.http.delete(environment.apiBaseUrl + '/users/' + userid).pipe(
        catchError( error => {
          return this.handleError(error);
        }));
  }

  updateUser(id, user): Observable<any>{
    return this.http.put(environment.apiBaseUrl+ '/users/'+ id, user).pipe(
      catchError( error => {
        return this.handleError(error);
      }));
  }

  assignDevice(deviceinfo){
    return this.http.post(environment.apiBaseUrl + '/users/assigndevice', deviceinfo).pipe(
      catchError(error => {
        return this.handleError(error);
      }));
  }

  handleError(error){
    return throwError(error);
  }

  
}
