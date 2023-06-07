import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificheService {

  constructor() { }

  setNotifica(titolo: string, testo: string){
    if(!("Notification" in window)){

    }else if(Notification.permission === "granted"){
      var notification = this.creaNotifica(titolo, testo);
      
    }else if(Notification.permission !== "denied"){
      Notification.requestPermission().then((permission: NotificationPermission) => {
        if(permission === 'granted'){
          var notification = this.creaNotifica(titolo, testo);
        }
      })
    }
  }

  private creaNotifica(titolo: string, testo: string){
    return new Notification(titolo, {
      lang: 'it',
      body: testo,
      icon: "assets/img/bgv.png",
      vibrate: [200, 100, 200]
    });
  }
}
