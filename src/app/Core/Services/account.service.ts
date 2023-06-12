import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Register } from 'src/app/Shared/Models/Register';
import { Login } from 'src/app/Shared/Models/Login';
import { User } from 'src/app/Shared/Models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();

  jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  Register(registerData:Register):Observable<boolean>{
    return this.http.post<boolean>("url",registerData,{
      headers: {'Ocp-Apim-Subscription-Key':'key'}
    })
  }

  Login(loginData:Login):Observable<boolean>{
    return this.http.post<boolean>("url",loginData,{
      headers: {'Ocp-Apim-Subscription-Key':'key'}
    }).pipe(map((response: any) =>{ 
      if(response){
        localStorage.setItem('token', response.token);
        return true;
      }else{
        return false;
      }
    }));
  }

  Logout(){
    localStorage.removeItem('token');
    this.currentUserSubject.next({} as User);
    this.isLoggedInSubject.next(false);
  }

  populateUserInfoFromToken(){
    var tokenValue = localStorage.getItem('token');

    if(tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)){
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.isLoggedInSubject.next(true);
      const newUser:User = {
        email: decodedToken.email,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        password: decodedToken.password
      };
      this.currentUserSubject.next(newUser);
    }
  }


  ValidJWTToken(){
    var tokenValue = localStorage.getItem('token');
    if(tokenValue && !this.jwtHelper.isTokenExpired(tokenValue)){
      const decodedToken = this.jwtHelper.decodeToken(tokenValue);
      this.populateUserInfoFromToken();
    };

  }
}
