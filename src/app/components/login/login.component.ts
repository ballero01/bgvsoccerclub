import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import 'zone.js/dist/zone';
import { NotificheService } from 'src/app/services/notifiche/notifiche.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges{

  @Output() snLogin = new EventEmitter<boolean>();

  form: FormGroup;

  loginOk: boolean = true;

  textLogin: string = "";

  constructor(public auth: AuthService, private router: Router, private n: NotificheService) {  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    this.auth.doLogin(this.form.value).subscribe(
      res => {
        let r = JSON.parse(res);

        if(r[0] == "NL"){
          this.loginOk = false;
          this.textLogin = r[1];
        }else if(r[0] == "OK"){
          sessionStorage.setItem("uid", r[1]);
          sessionStorage.setItem("livello", r[2]);
          this.auth.loginMade();

          this.n.setNotifica("Benvenuto", "SEMPRE FORZA BGV");

          this.router.navigate(['h']);
        }else{
          alert(r[1]);
        }
        
      }
    );
  }

}
