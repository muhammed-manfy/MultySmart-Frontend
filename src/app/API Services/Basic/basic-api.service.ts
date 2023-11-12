import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicApiService {

  protected BaseUrl: String = 'https://backend-service-q65x.onrender.com';

  protected token = localStorage.getItem('user-token');
  protected headers = new HttpHeaders()
    .append('token_authorization', `${this.token}`);

  protected adminToken = localStorage.getItem('admin-token');

  protected adminHeaders = new HttpHeaders()
    .append('token_authorization', `${this.adminToken}`);

  constructor() { }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.message);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
