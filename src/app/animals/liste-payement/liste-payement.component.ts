import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireObject , AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
//import { AuthentificationService } from '../service/authentification.service';
import { ClientserviceService, Paye} from '../../shared/service/clientservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { Animal } from 'src/app/shared/model/Animal.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AnimalsService } from 'src/app/shared/services/animals.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileserviceService } from 'src/app/shared/service/fileservice.service';
@Component({
  selector: 'app-liste-payement',
  templateUrl: './liste-payement.component.html',
  styleUrls: ['./liste-payement.component.scss']
})
export class ListePayementComponent implements OnInit {
  tableau:Observable<Paye>;
  list: Animal[];
  animalS:any =[];
  index:number=0;


  refresh:boolean=false;
  form = new FormGroup({
    titre: new FormControl(''),
    prix: new FormControl(0),
    description: new FormControl(''),
    type: new FormControl(''),
    url: new FormControl(''),



  });
  selectedImage: any = null;
  url:string;
  id:string;
  desc:string;
  file:string;

  tab:any=[];
  itemsRef: AngularFireList<any[]>;
  monbase:string;

  //tmp=false;
  nomUtilisateur="";
  nom=null;

  constructor(private fileService:FileserviceService,private authSrv:AuthService,private db :AngularFireDatabase,private storage: AngularFireStorage,  private clientService: ClientserviceService, private toastr: ToastrService,private router: Router, private animalSrv: AnimalsService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.tableau=this.get();

    if(this.authSrv.utilisateurConnecte()==false){
      this.router.navigateByUrl('/login')

    }
    this.animalSrv.getAnimal().subscribe(actionArray=>{ this.list= actionArray.map(item=>{
      return {
        id: item.payload.doc.id,
        ...item.payload.doc.data() as Animal};
    })

    });
    this.animalS=this.animalSrv.getAnimal();
  }
  get():Observable<any>{
    return this.db.list<Paye>('Payements').valueChanges();
}
onDelete(id: string) {
  console.log("niania");
  this.fileService.getImage(id);
  this.toastr.error('Suppression réussie!','Element Supprimé avec succés');
  this.router.navigateByUrl('/animal/list');

}

getObject(item:Animal){
  return item;
}
ajouteAnimal={
  "id":"",
  "titre":"",
  "description":"",
  "prix":0,
  "type":"",
  "url":""

 };

ajourAnimal(animal:Animal){
  this.ajouteAnimal=animal;
}

onSubmit(id) {

  this.animalSrv.deleteAnimal(id);

  const animal = this.form.value;
  this.animalSrv.addAnimal({ ...animal });
  this.toastr.info('Modification réussie !','Element modifié');
}


openModal( exampleModalContent ) {
  this.modalService.open( exampleModalContent, { size : 'lg' } );
}

openMediumModal( mediumModalContent ) {
  this.modalService.open( mediumModalContent );
}

openSmallModal( smallModalContent ) {
  this.modalService.open( smallModalContent, { size : 'sm' } );
}


}
