import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StagioneService {

  private url = 'https://www.bgvsoccerclub.it/api/api.php';

  constructor(private http: HttpClient) { }

  getStatoStagione(){
    return this.http.post(this.url, {'todo': "getCountdown"}, {'responseType': 'text'});
  }
}
