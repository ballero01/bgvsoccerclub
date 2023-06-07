import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck{
  isLogin: boolean;

  constructor(private auth: AuthService, private http: HttpClient, private router: Router){
    this.auth.isLogin.subscribe(v => {
      this.isLogin = v;
    });
  }

  ngOnInit(){
    //this.isLogin = this.auth.loginV;
    this.isLogin = this.auth.isLoggedIn();

    this.auth.isLoggedInRef().subscribe(
      res => {
        res = JSON.parse(res);

        if(res[0] == "OK"){
          
        }
      }
    )
  }

  logout(){
    sessionStorage.removeItem("livello");
    sessionStorage.removeItem("uid");
    this.isLogin = false;
    this.router.navigate(["/"]);
  }

  ngDoCheck(): void {
    
  }
}
