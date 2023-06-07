import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/serviceplayer/player.service';

@Component({
  selector: 'app-nuovogiocatore',
  templateUrl: './nuovogiocatore.component.html',
  styleUrls: ['./nuovogiocatore.component.css']
})
export class NuovogiocatoreComponent implements OnInit{

  form: FormGroup
  allruoli: any;
  allgiocatori: any;

  formAttiva: FormGroup
  formDisattiva: FormGroup

  aggiungiOra: boolean = false;

  lastInsertId: number = 0;

  onUpdate = false;

  constructor(private ruoliservice: PlayerService){}

  ngOnInit(){
    this.initForm();

    this.formAttiva = new FormGroup({
      
    })

    this.formDisattiva = new FormGroup({
      
    })

    this.ruoliservice.getRuoli().subscribe(
      (res) => {
        this.allruoli = JSON.parse(res);
      }
    );
    this.ruoliservice.getGiocatori().subscribe(
      (res) => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          this.allgiocatori = Object.values(res[1]);
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }
      }
    ) 
  }

  attiva(idU: any){
    this.ruoliservice.attivaGiocatore({'idU': idU}).subscribe(
      (res) => {
        res = JSON.parse(res);
        if(res[0] == "ERR"){
          alert(res[1]);
        }else{
          for(let i = 0; i < this.allgiocatori.length; i++){
            if(this.allgiocatori[i].id == idU){
              this.allgiocatori[i].isAttivo = "1";
            }
          }
        }
      }
    )
  }

  disattiva(idU: any){
    this.ruoliservice.disattivaGiocatore({'idU': idU}).subscribe(
      (res) => {
        res = JSON.parse(res);
        if(res[0] == "ERR"){
          alert(res[1]);
        }else{
          for(let i = 0; i < this.allgiocatori.length; i++){
            if(this.allgiocatori[i].id == idU){
              this.allgiocatori[i].isAttivo = "0";
            }
          }
          
        }
      }
    )
  }

  change(){
    this.aggiungiOra = !this.aggiungiOra;
  }

  onSubmit(){
    this.onUpdate = false;
    this.ruoliservice.addPlayer(this.form.value).subscribe(
      res => {
        let r = JSON.parse(res);
        if(r[0] == "OK"){
          this.form.reset();
          this.initForm();
          this.ruoliservice.getGiocatori().subscribe(
            res1 => {
              res1 = JSON.parse(res1);
              if(res1[0] == "OK"){
                this.allgiocatori = Object.values(res1[1]);
              }else if(res1[0] == "ERR"){
                alert(res1[1]);
              }
              this.lastInsertId = r[1];
            }
          )
        }else if(r[0] == "ERR"){
          alert(r[1]);
        }
      }
    );
  }

  carica(g: any) {
    this.onUpdate = true;
    this.aggiungiOra = true;
    this.form = new FormGroup({
      'idU': new FormControl(g.id, Validators.required),
      'nome': new FormControl(g.nome, Validators.required),
      'cognome': new FormControl(g.cognome, Validators.required),
      'dataDiNascita': new FormControl(g.dataDiNascita),
      'numeroTessera': new FormControl(g.codiceTessera),
      'cartaIdentita': new FormControl(g.numeroDocumento),
      'codFiscale': new FormControl(g.codiceFiscale),
      'numeroMatricola': new FormControl(g.numeroMatricola),
      'ruolo': new FormControl(g.linkRuolo, [Validators.required, Validators.pattern("^[1-9]*$")]),
      'tipoTessera': new FormControl(g.tipoDocumento)
    });
  }

  initForm(){
    this.form = new FormGroup({
      'idU': new FormControl(0),
      'nome': new FormControl(null, Validators.required),
      'cognome': new FormControl(null, Validators.required),
      'dataDiNascita': new FormControl(),
      'numeroTessera': new FormControl(),
      'cartaIdentita': new FormControl(),
      'codFiscale': new FormControl(),
      'numeroMatricola': new FormControl(),
      'ruolo': new FormControl(0, [Validators.required, Validators.pattern("^[1-9]*$")]),
      'tipoTessera': new FormControl(0)
    });
  }
}
