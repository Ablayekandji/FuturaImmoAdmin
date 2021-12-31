import { JsonPipe } from '@angular/common';
import { Injectable ,Inject} from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
//import { Data } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {
  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Client = {
    ide:'',
    nom:'',
    prenom:''
  };
  msg:string = 'error';

  tab: any=[];
  dbPath='/imageDetails';
  rvs:AngularFireList<Client>=null;


  constructor( private firebase: AngularFireDatabase) { }

  getClientDetailList () {
    this.imageDetailList = this.firebase.list('Clients');
  }
  insertClients(client:Client) {

    //JSON.parse( JSON.stringify(this.dataSet ) )

    this.imageDetailList.push(client);
  }
  insertPayement(payer:Paye) {

    //JSON.parse( JSON.stringify(this.dataSet ) )

    this.imageDetailList.push(payer);
  }
  getClientDetailListPaye () {
    this.imageDetailList = this.firebase.list('Payements');
  }
  get():Observable<any>{
    return this.firebase.list<Client>('Clients').valueChanges();
  }
}
export class Client{
  ide:string;
  nom:string;
  prenom:string;
}
export class Paye{
  cniclient:string;
  date:string;
}
