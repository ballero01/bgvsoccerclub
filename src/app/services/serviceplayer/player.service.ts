import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private url = 'https://www.bgvsoccerclub.it/api/api.php';

  constructor(private http: HttpClient) { }

  getRuoli(){
    return this.http.post(this.url, {
      'todo': "getRuoli"
    }, {responseType: "text"});
  }

  getGiocatori(){
    return this.http.post(this.url, {'todo': "getGiocatori"}, { responseType: 'text' });
  }

  getGiocatoriAttivi(){
    return this.http.post(this.url, {'todo': "getGiocatoriAttivi"}, { responseType: 'text' });
  }

  addPlayer(body: any){
    body.todo = "addGiocatore";
    return this.http.post(this.url, body, { responseType: 'text' });
  }

  attivaGiocatore(body: any){
    body.todo = "attivaGiocatore";
    return this.http.post(this.url, body, { responseType: 'text' });
  }

  disattivaGiocatore(body: any){
    
    body.todo = "disattivaGiocatore";
    return this.http.post(this.url, body, { responseType: 'text' });
  }
}
