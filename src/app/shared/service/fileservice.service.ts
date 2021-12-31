import { JsonPipe } from '@angular/common';
import { Injectable ,Inject} from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
//import { Data } from '@angular/router';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileserviceService {
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id:'',
    prix:'',
    url:'',
    desc:''
  };
  msg:string = 'error';

  tab: any=[];
  dbPath='/imageDetails';
  rvs:AngularFireList<Data>=null;

  constructor(  private firebase: AngularFireDatabase) {
    this.rvs=firebase.list(this.dbPath);
  }

  getImageDetailList () {
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  getImageDetailListAppart(){
    this.imageDetailList = this.firebase.list('Appartement');
  }
  getImageDetailListMaisonVente(){
    this.imageDetailList = this.firebase.list('Vente');
  }

  /*insertImageDetails(id,url,desc) {
    this.dataSet = {
      id : id,
      url: url,
      desc:desc
    };
    //JSON.parse( JSON.stringify(this.dataSet ) )
    this.imageDetailList.push(JSON.parse( JSON.stringify(this.dataSet )));
  }*/
  insertImageDetails(rv:Data) {

    //JSON.parse( JSON.stringify(this.dataSet ) )
    this.imageDetailList.push(rv);
  }
  getImage(value){
    let tmp;
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => {
          return item.payload.val();  });
        this.fileList.forEach(element => {
          //let key = element.key;
          console.log("clef"+list);

          if(element.id===value)
          {

          tmp=list[value].key;
          this.msg = element.url;
          //console.log("niania3 "+element.payload.key);
          console.log(list[value].key);
          console.log("niania 1 "+element.id);
          //return 0;
          }
          return 0;
        });
        if(this.msg==='error')
         console.log("niania2");

        else{
          this.imageDetailList.remove(tmp);
          this.msg = 'error';
        }

      }
    );
  }

  get():Observable<any>{
    return this.firebase.list<Data>('Location').valueChanges();
  }

  delete(id:string):Promise<void>{
    return this.rvs.remove(id);
  }


}
export class Data{
  id:string;
  prix:string;
  url:string;
  desc:string;
}
