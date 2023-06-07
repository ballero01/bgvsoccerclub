import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anteprimanotizia',
  templateUrl: './anteprimanotizia.component.html',
  styleUrls: ['./anteprimanotizia.component.css']
})
export class AnteprimanotiziaComponent {
  @Input() notizia: any;

}
