import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const authToken = sessionStorage.getItem('token');
    
    if (authToken){
      request = request.clone({
        setHeaders:{Authorization : authToken }
      });
    }
    else{
      request = request.clone();
    }
    return next.handle(request);
  } 
}
