import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentiService {
  private url = 'https://www.bgvsoccerclub.it/api/api.php';
  
  constructor(private http: HttpClient) { }

  getAllComponenti(){
    return this.http.post(this.url, {'todo': 'getAllComponenti'}, {responseType: 'text'});
  }

  addComponente(body: any){
    body.todo = "addComponente";
    return this.http.post(this.url, body, {responseType: 'text'});
  }
}
