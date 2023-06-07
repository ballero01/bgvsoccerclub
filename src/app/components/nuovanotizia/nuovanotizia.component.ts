import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotiziaService } from 'src/app/services/servicenotizia/notizia.service';
@Component({
  selector: 'app-nuovanotizia',
  templateUrl: './nuovanotizia.component.html',
  styleUrls: ['./nuovanotizia.component.css']
})
export class NuovanotiziaComponent implements OnInit{
  public Editor = ClassicEditor;
  file: any;
  status: boolean;

  imageSrc: any;

  allNotizie: any;

  inModifica: boolean = false;

  loadNotizia = {
    titolo: "",
    imgCopertina: "",
    autore: "",
    datapubblicazione: "",
    isAttiva: "on",
    id: ""
  }
  

  public model = {
    editorData: ''
  };

  constructor (private notizias: NotiziaService){}

  ngOnInit(): void {
      this.getAllNotizie();
  }

  onSubmit(form: NgForm){
    form.value.immagineCopertina = this.imageSrc;
    if(this.inModifica){
      form.value.id = this.loadNotizia.id;
    }
    this.notizias.creaNotizia(form.value).subscribe(
      res => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          this.getAllNotizie();
          form.resetForm();
        }else if(res[0] == "ERR"){
          alert(res[1]);
        }
      }
    )
  }

  fileChange(event: any){
    this.file = event.target.files[0];
    this.status = event.target.files.length>0?true:false
    if(this.status==true){
       const reader = new FileReader();
       reader.readAsDataURL(this.file);
       reader.onload = () => {
          this.imageSrc = reader.result;          
       }
    }
  }

  getAllNotizie(){
    this.notizias.getAllNotizie().subscribe(
      res => {
        res = JSON.parse(res);
        if(res[0] == "OK"){
          this.allNotizie = Object.values(res[1]);
        }
      }
    )
  }

  modifica(event: any, i: any){
    this.backOnTop()
    this.carica(i)
  }

  backOnTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  private carica(i: any){
    console.log(this.allNotizie[i])
    this.inModifica = true;
    this.loadNotizia.titolo = this.allNotizie[i].titolo;
    this.loadNotizia.autore = this.allNotizie[i].autore;
    this.loadNotizia.datapubblicazione = this.allNotizie[i].datapubblicazione;
    this.model.editorData = this.allNotizie[i].testo;
    this.loadNotizia.isAttiva = this.allNotizie[i].isAttiva == "1" ? "on" : "";
    this.loadNotizia.id = this.allNotizie[i].id;
  }
  
}
