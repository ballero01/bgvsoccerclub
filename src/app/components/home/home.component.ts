import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotiziaService } from 'src/app/services/servicenotizia/notizia.service';
import { StagioneService } from 'src/app/services/stagione/stagione.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  stagioneIniziata: boolean = false;

  tutteLeNotizie: any;

  index: number;

  notiziePerVolta: number = 1;

  numeroPagine: number;

  iterNumPagine: any;

  onLoad: boolean = true;

  cd: number;

  tempo: string;

  constructor(private notizias: NotiziaService, private stagiones: StagioneService){}

  ngOnInit(){
    
    this.index = 1;
    this.setNotizie();
    this.checkStagione();
  }

  checkStagione(){
    this.stagiones.getStatoStagione().subscribe(
      res => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          let r = JSON.parse(JSON.stringify(res[1]));
          if(r.dataFine == null){
            this.stagioneIniziata = false;
            this.setCountdown(r.dataPartenza);
          }else{
            this.stagioneIniziata = true;
          }
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }
      }
    )
  }

  setCountdown(dataPartenza: string){
    let now: number = Date.now();
    this.cd = Date.parse(dataPartenza) - now;
    this.makeTempo(this.cd);
    setInterval(
      () => {
        this.cd -= 1000;
        this.makeTempo(this.cd);
      }, 1000)
  }

  makeTempo(millseconds: number){
    var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
    var minutes = Math.floor((millseconds % oneHour) / oneMinute);
    var hours = Math.floor((millseconds % oneDay) / oneHour);
    var days = Math.floor(millseconds / oneDay);

    var timeString = '';
    if (days !== 0) {
        timeString += (days !== 1) ? (days + ' giorni ') : (days + ' giorno ');
    }
    if (hours !== 0) {
        timeString += (hours !== 1) ? (hours + ' ore ') : (hours + ' ora ');
    }
    if (minutes !== 0) {
        timeString += (minutes !== 1) ? (minutes + ' minuti ') : (minutes + ' minuto ');
    }
    if (seconds !== 0 || millseconds < 1000) {
        timeString += (seconds !== 1) ? (seconds + ' secondi ') : (seconds + ' secondo ');
    }

    this.tempo = timeString
  }

  setNotizie(){
    this.notizias.getAllNotizieAttive().subscribe(
      res => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          this.tutteLeNotizie = Object.values(res[1]);
          console.log(this.tutteLeNotizie);
          this.numeroPagine = Number.parseInt((this.tutteLeNotizie.length/this.notiziePerVolta).toString());
          if(this.numeroPagine == 0){
            this.numeroPagine = 1;
          }
          this.iterNumPagine = Array(this.numeroPagine).fill(1).map((x,i)=>i);
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }

        this.onLoad = false;
      }
    )
  }

  previous(){
    if(this.index > 1){
      this.index--;
    }
  }

  next(){
    if(this.index < this.numeroPagine){
      this.index++;
    }
  }

  vai(i: number){
    if(i <= this.numeroPagine && i >= 1){
      this.index = i;
    }
    
  }

}
