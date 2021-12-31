import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalShowComponent } from './animal-show/animal-show.component';
import { AnimalNewComponent } from './animal-new/animal-new.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClientNewComponent } from './client-new/client-new.component';
import { AppartementListComponent } from './appartement-list/appartement-list.component';
import { MaisonVenteComponent } from './maison-vente/maison-vente.component';
import { PayementComponent } from './payement/payement.component';
import { ListePayementComponent } from './liste-payement/liste-payement.component';

const routes: Routes = [
  { path: 'list', component: AnimalListComponent },
  { path: 'new', component: AnimalNewComponent },
  { path: 'clients', component: AnimalShowComponent },
  {path:'newclient',component:ClientNewComponent},
  {path:'appartement',component:AppartementListComponent},
  {path:'maisonvente',component:MaisonVenteComponent},
  {path:'paiement',component:PayementComponent},
  {path:'listepaye',component:ListePayementComponent}
];



@NgModule({
  declarations: [AnimalListComponent, AnimalShowComponent, AnimalNewComponent, ClientNewComponent, AppartementListComponent, MaisonVenteComponent, PayementComponent, ListePayementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ]
})
export class AnimalsModule { }
