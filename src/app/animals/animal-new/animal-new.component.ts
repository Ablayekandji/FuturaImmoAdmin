import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnimalsService } from 'src/app/shared/services/animals.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireDatabase, AngularFireObject , AngularFireList } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
//import { AuthentificationService } from '../service/authentification.service';
import { FileserviceService } from '../../shared/service/fileservice.service';





@Component({
  selector: 'app-animal-new',
  templateUrl: './animal-new.component.html',
  styleUrls: ['./animal-new.component.scss']
})
export class AnimalNewComponent implements OnInit {
  mesimages: any= [];
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

   form = new FormGroup({
    titre: new FormControl(''),
    prix: new FormControl(0),
    description: new FormControl(''),
    type: new FormControl(''),
    url: new FormControl(''),



  });

  constructor(private db :AngularFireDatabase,private storage: AngularFireStorage,  private fileService: FileserviceService,private authSrv:AuthService,private  service: AnimalsService, private firestore:AngularFirestore, private toastr: ToastrService,private router: Router) {
    this.tableau= this.get();
    //this.tab=this.get();
    this.itemsRef = db.list('/imageDetails');
    //this.tab=this.tableau;
   }

  ngOnInit() {
    if(this.authSrv.utilisateurConnecte()==false){
      this.router.navigateByUrl('/login')

    }
    console.log(this.tableau);
    this.fileService.getImageDetailList();
    //this.fileService.getImage(this.file); je pense que elle la cause de limage qui s'affiche
    //this.tab=this.tableau;
  }
  /*onSubmit() {
    const animal = this.form.value;
    this.service.addAnimal({ ...animal });
    this.form.reset();
    this.toastr.success('Enregistrement réussi !','Nouvelle publication');
    this.router.navigateByUrl('/animal/list');

  }*/
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    this.mesimages.push(event.target.files[0]);
    console.log( this.mesimages);
  }


  save() {
    let cpt=0;
    for (let index = 0; index < this.mesimages.length; index++) {

      const element = this.mesimages[index].name;
      var name = element;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.mesimages[index]).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          if(index+1==1){
            console.log("nini");
            this.boubousaisi.url = url;
            cpt++;
          }
          if(index+1==2){
            console.log("nini2");
            this.boubousaisi.url1 = url;
            cpt++;
          }
          if(index+1==3){
            console.log("nini3");
            this.boubousaisi.url2 = url;
            cpt++;
          }
          if(index+1==4){
            console.log("nini4");
            this.boubousaisi.url3 = url;
            cpt++;
          }

          if(cpt==4){
            console.log("nini5");
            if(this.monbase==="Appartement"){
              this.fileService.getImageDetailListAppart();
              this.fileService.insertImageDetails(this.boubousaisi);
              this.toastr.success('Enregistrement réussi !','Nouvelle publication');
              this.router.navigateByUrl('/futura/appartement');
            }
            if(this.monbase==="Vente"){
              this.fileService.getImageDetailListMaisonVente();
              this.fileService.insertImageDetails(this.boubousaisi);
              this.toastr.success('Enregistrement réussi !','Nouvelle publication');
              this.router.navigateByUrl('/futura/maisonvente');
            }
            if(this.monbase==="Location"){
              this.fileService.insertImageDetails(this.boubousaisi);
              this.toastr.success('Enregistrement réussi !','Nouvelle publication');
              this.router.navigateByUrl('/futura/list');
            }

          }


         // this.tmp=true;
        })
      })
    ).subscribe();

    }

    //this.tmp=false;
  }
  view(){
   // this.fileService.getImage(this.file);

  }
  get():Observable<any>{
     return this.db.list<Data>('Location').valueChanges();
}
deleterv(id:string) {
  if (window.confirm('Etes-vous sur!')) {
    this.fileService.getImage(id);
    this.get();

  }
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
