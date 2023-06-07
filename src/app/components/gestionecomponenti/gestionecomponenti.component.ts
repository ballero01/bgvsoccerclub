import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComponentiService } from 'src/app/services/componenti/componenti.service';

@Component({
  selector: 'app-gestionecomponenti',
  templateUrl: './gestionecomponenti.component.html',
  styleUrls: ['./gestionecomponenti.component.css']
})
export class GestionecomponentiComponent implements OnInit{

  allComponenti: any;

  allRuoliComponenti: any;

  constructor(private comps: ComponentiService){ }

  ngOnInit(): void {
    this.setComponenti()
  }

  setComponenti(){
    this.comps.getAllComponenti().subscribe(
      res => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          this.allComponenti = Object.values(res[1]);
          this.allRuoliComponenti = Object.values(res[2]);
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }
      }
    )
  }

  onSubmit(form: NgForm){
    this.comps.addComponente(form.value).subscribe(
      res => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          form.resetForm();
          this.setComponenti();
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }
      }
    )
  }

}
