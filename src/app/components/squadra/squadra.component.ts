import { Component, OnInit } from '@angular/core';
import { ComponentiService } from 'src/app/services/componenti/componenti.service';
import { PlayerService } from 'src/app/services/serviceplayer/player.service';

@Component({
  selector: 'app-squadra',
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.css']
})
export class SquadraComponent implements OnInit{

  allGiocatori: any;

  allComponenti: any;

  portieri: any = [];
  difensori: any = [];
  centrocampisti: any = [];
  attaccanti: any = [];

  constructor(private giocatoriS: PlayerService, private componentiS: ComponentiService){ }

  ngOnInit(): void {
      this.setGiocatori()
  }

  setGiocatori(){
    this.giocatoriS.getGiocatoriAttivi().subscribe(
      (res) => {
        res = JSON.parse(res);
        
        if(res[0] == "OK"){
          this.allGiocatori = Object.values(res[1]);
          this.setRuoli();
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }
        
      }
    ) 
  }

  setRuoli(){
    for(let g of this.allGiocatori){
      if(g.ruolo == "Portiere"){
        this.portieri.push(g);
      }else if(g.ruolo == "Difensore"){
        this.difensori.push(g);
      }else if(g.ruolo == "Centrocampista"){
        this.centrocampisti.push(g);
      }else if(g.ruolo == "Attaccante"){
        this.attaccanti.push(g)
      }


    }
  }

}
