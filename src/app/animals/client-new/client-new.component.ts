import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireObject , AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
//import { AuthentificationService } from '../service/authentification.service';
import { ClientserviceService} from '../../shared/service/clientservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss']
})
export class ClientNewComponent implements OnInit {
  selectedImage: any = null;
  clientsaisi= new Client();

  constructor(private db :AngularFireDatabase,private storage: AngularFireStorage,  private clientService: ClientserviceService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.clientService.getClientDetailList();
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  save(){
    var name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.clientsaisi.photoiden = url;
          this.clientService.insertClients(this.clientsaisi);
          this.toastr.success('Enregistrement réussi !','Nouvelle publication');
          this.router.navigateByUrl('/futura/clients');
         // this.tmp=true;
        })
      })
    ).subscribe();

  }

}
export class Client{
  ide:string;
  nom:string;
  prenom:string;
  photoiden:string;
}
