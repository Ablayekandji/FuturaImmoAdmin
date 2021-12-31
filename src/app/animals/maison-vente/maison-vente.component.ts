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
import { Animal } from 'src/app/shared/model/Animal.model';

@Component({
  selector: 'app-maison-vente',
  templateUrl: './maison-vente.component.html',
  styleUrls: ['./maison-vente.component.scss']
})
export class MaisonVenteComponent implements OnInit {
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
  book:Data;
  tableau:Observable<Data>;
  tab:any=[];
  itemsRef: AngularFireList<any[]>;

  boubousaisi= new Data();
  //tmp=false;
  nomUtilisateur="";
  nom=null;
  monbase:string;
date:Date;

  constructor(private fileService:FileserviceService,private db :AngularFireDatabase,private storage: AngularFireStorage,  private clientService: ClientserviceService,private authSrv:AuthService,private router: Router, private animalSrv: AnimalsService, private modalService: NgbModal,private toastr: ToastrService) {
    this.tableau= this.get();
   }

  ngOnInit(): void {
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
    return this.db.list<Data>('Vente').valueChanges();
}

onDelete(id: string) {
  console.log("niania");
  this.fileService.getImage(id);
  this.toastr.error('Suppression réussie!','Element Supprimé avec succés');
  this.router.navigateByUrl('/animal/maisonvente');

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
export class Data{
  id:string;
  prix:string;
  url:string;
  url1:string;
  url2:string;
  url3:string;
  desc:string;
}
