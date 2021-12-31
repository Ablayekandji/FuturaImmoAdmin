import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireObject , AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
//import { AuthentificationService } from '../service/authentification.service';
import { ClientserviceService} from '../../shared/service/clientservice.service';
import { ToastrService } from 'ngx-toastr';
import { AnimalsService } from 'src/app/shared/services/animals.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FileserviceService } from 'src/app/shared/service/fileservice.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-animal-show',
  templateUrl: './animal-show.component.html',
  styleUrls: ['./animal-show.component.scss']
})
export class AnimalShowComponent implements OnInit {
  tableau:Observable<Client>;
  animalS:any =[];
  index:number=0;
  monbase:string;


  refresh:boolean=false;
  form = new FormGroup({
    titre: new FormControl(''),
    prix: new FormControl(0),
    description: new FormControl(''),
    type: new FormControl(''),
    url: new FormControl(''),



  });

  constructor(private db :AngularFireDatabase,private storage: AngularFireStorage,  private clientService: ClientserviceService,private authSrv:AuthService,private router: Router, private animalSrv: AnimalsService, private modalService: NgbModal,private toastr: ToastrService) {
    this.tableau= this.get();
   }

  ngOnInit(): void {
    this.clientService.getClientDetailList();
    if(this.authSrv.utilisateurConnecte()==false){
      this.router.navigateByUrl('/login')

    }
  }
  ajouteAnimal={
    "id":"",
    "titre":"",
    "description":"",
    "prix":0,
    "type":"",
    "url":""

   };
  openModal( exampleModalContent ) {
    this.modalService.open( exampleModalContent, { size : 'lg' } );
  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  openSmallModal( smallModalContent ) {
    this.modalService.open( smallModalContent, { size : 'sm' } );
  }

  get():Observable<any>{
    return this.db.list<Client>('Clients').valueChanges();
}
parcour(){}
}
export class Client{
  ide:string;
  nom:string;
  prenom:string;
}
