import { Component } from '@angular/core';
import { AccountService } from './Core/Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AntraHRMSPA';

  constructor(private accountService: AccountService){}

  ngOnInit(){
    if(localStorage.getItem('toke') != null){
      this.accountService.ValidJWTToken();
    }
  }
}
