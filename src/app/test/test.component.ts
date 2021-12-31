import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireObject , AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
//import { AuthentificationService } from '../service/authentification.service';
import { FileserviceService } from '../shared/service/fileservice.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  selectedImage: any = null;
  mesimages: any= [];
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

  constructor(private db :AngularFireDatabase,private storage: AngularFireStorage,  private fileService: FileserviceService) {
    this.tableau= this.get();
    //this.tab=this.get();
    this.itemsRef = db.list('/imageDetails');
    //this.tab=this.tableau;
   }

  ngOnInit(): void {
    console.log(this.tableau);
    this.fileService.getImageDetailList();
    //this.fileService.getImage(this.file); je pense que elle la cause de limage qui s'affiche
    //this.tab=this.tableau;
  }
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

            this.fileService.insertImageDetails(this.boubousaisi);
            alert('Ajouter avec succes');
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
