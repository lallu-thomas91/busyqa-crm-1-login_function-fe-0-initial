import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  username: string = '';

  authenticated = false;

  constructor(private http: HttpClient) { }

  signupUser(user: User){
    return this.http
            .post<User>(
              environment.host + '/signup', user);
  }


  authenticateUser(inputUser: User){
    
    const header = new HttpHeaders(inputUser ? {
                    authorization: 'Basic ' + btoa(inputUser.username + ':' 
                    + inputUser.password)
                    }:{});
    return this.http
                .get<any>(
                  environment.host + '/login', {headers: header})
                  .pipe(
                    map(response => {
                      sessionStorage.setItem('username', inputUser.username);
                      let tokenstr = "Basic " + btoa(inputUser.username + ':' 
                      + inputUser.password);
                      sessionStorage.setItem('token', tokenstr);
                      return response;
                    }),

                  ) ;
  }

  checkUsernameExists(username: String){
    return this.http
		         .get<User>(
              environment.host + '/check/' + username);
  }


  findUser(username: string){
    return this.http
		         .get<User>(
              environment.host + '/welcome/' + username);
  }

  logout() {
    return this.http.post(environment.host + '/logout', {});  
  }


}
