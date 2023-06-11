import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/Shared/Models/Register';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  Register(registerData:Register):Observable<boolean>{
    return this.http.post<boolean>("url",registerData,{
      headers: {'Ocp-Apim-Subscription-Key':'key'}
    });
  }
}
