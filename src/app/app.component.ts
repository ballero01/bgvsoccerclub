import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { AuthService } from 'src/app/services/authentication/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck, OnChanges{

  isLogin: boolean = false;
  getSnLogin() {
    
  }
  title = 'BGVSoccerClub';

  constructor(private auth: AuthService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  
  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    
  }


}
