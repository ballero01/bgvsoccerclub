import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotiziaService {
  private url = 'https://www.bgvsoccerclub.it/api/api.php';
  constructor(private http: HttpClient) { }

  creaNotizia(body: any){
    body.todo = "creaNotizia";
    
    return this.http.post(this.url, body, {responseType: "text"});
  }

  getAllNotizieAttive(){
    return this.http.post(this.url, {"todo": "getAllNotizieAttive"}, {responseType: 'text'});
  }

  getAllNotizie(){
    return this.http.post(this.url, {"todo": "getAllNotizie"}, {responseType: 'text'});
  }

  getNotiziaById(body: any){
    body.todo = "getNotiziaById";
    return this.http.post(this.url, body, {responseType: "text"});
  }

}
