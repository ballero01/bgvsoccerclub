import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha512 } from 'js-sha512';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://www.bgvsoccerclub.it/api/api.php';

  private errormsg: string;
  public snLogin: boolean = false;

  public isLogin: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {
    
  }

  loginMade(){
    this.snLogin = true;
    this.isLogin.next(true);
  }
  

  doLogin(body: any){
    body.password = sha512(body.password);
    body.todo = "login";
    return this.http.post(this.url, body, {responseType: "text"});
  }

  checkToDo(res: any): boolean {
    if(res[0] == "ERR"){
      this.errormsg = res[1];
      return false;
    }else{
      return true;
    }
  }

  //---------------------------------------
  isLoggedIn(): boolean{
    if(!sessionStorage.getItem("uid")){
      return false;
    }
    return sessionStorage.getItem("uid") != "";
    //return this.snLogin;
  }

  isLoggedInRef(){
    return this.http.post(this.url, {'todo': "checkLogin"}, {responseType: "text"});
  }

}
