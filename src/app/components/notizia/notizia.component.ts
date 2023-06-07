import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotiziaService } from 'src/app/services/servicenotizia/notizia.service';

@Component({
  selector: 'app-notizia',
  templateUrl: './notizia.component.html',
  styleUrls: ['./notizia.component.css']
})
export class NotiziaComponent implements OnInit{

  notizia: any;

  constructor(private route: ActivatedRoute, private notizias: NotiziaService){}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.notizias.getNotiziaById({'id': id}).subscribe(
      res => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          this.notizia = res[1];
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }
      }
    );
  }

}
