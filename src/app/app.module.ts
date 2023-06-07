import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ArticoloComponent } from './components/articolo/articolo.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { GestioneComponent } from './components/gestione/gestione.component';
import { RosaComponent } from './components/rosa/rosa.component';
import { GiocatoreComponent } from './components/giocatore/giocatore.component';
import { NuovogiocatoreComponent } from './components/nuovogiocatore/nuovogiocatore.component';
import { NuovanotiziaComponent } from './components/nuovanotizia/nuovanotizia.component';
import { NotiziaComponent } from './components/notizia/notizia.component';
import { AnteprimanotiziaComponent } from './components/anteprimanotizia/anteprimanotizia.component';
import { GestionecompetizioniComponent } from './components/gestionecompetizioni/gestionecompetizioni.component';
import { GestionecomponentiComponent } from './components/gestionecomponenti/gestionecomponenti.component';
import { SquadraComponent } from './components/squadra/squadra.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArticoloComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    GestioneComponent,
    RosaComponent,
    GiocatoreComponent,
    NuovogiocatoreComponent,
    NuovanotiziaComponent,
    NotiziaComponent,
    AnteprimanotiziaComponent,
    GestionecompetizioniComponent,
    GestionecomponentiComponent,
    SquadraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),/*!isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).*/
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
