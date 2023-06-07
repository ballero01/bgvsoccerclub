import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { GestioneComponent } from './components/gestione/gestione.component';
import { RosaComponent } from './components/rosa/rosa.component';
import { NuovogiocatoreComponent } from './components/nuovogiocatore/nuovogiocatore.component';
import { NuovanotiziaComponent } from './components/nuovanotizia/nuovanotizia.component';
import { NotiziaComponent } from './components/notizia/notizia.component';
import { authenticationGuard } from './services/authentication/authentication.guard';
import { GestionecompetizioniComponent } from './components/gestionecompetizioni/gestionecompetizioni.component';
import { GestionecomponentiComponent } from './components/gestionecomponenti/gestionecomponenti.component';
import { SquadraComponent } from './components/squadra/squadra.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "h", component: GestioneComponent, canActivate: [authenticationGuard]},
  { path: "login", component: LoginComponent },
  { path: "gestionerosa", component: RosaComponent, canActivate: [authenticationGuard]},
  { path: "nuovogiocatore", component: NuovogiocatoreComponent, canActivate: [authenticationGuard]},
  { path: "nuovanotizia", component: NuovanotiziaComponent, canActivate: [authenticationGuard]},
  { path: "notizia/:id", component: NotiziaComponent},
  { path: "gestionecompetizioni", component: GestionecompetizioniComponent, canActivate: [authenticationGuard]},
  { path: "gestionecomponenti", component: GestionecomponentiComponent, canActivate: [authenticationGuard]},
  { path: "squadra", component: SquadraComponent},
  /*
  { path: "...", component: Qualcosa, children: [
    { path: ":id", component: Altro }
  ] }



  */
  { path: "404", component: ErrorComponent},
  { path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
