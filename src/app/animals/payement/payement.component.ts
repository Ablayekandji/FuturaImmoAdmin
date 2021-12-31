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
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent implements OnInit {
  payementef=new Paye();
  constructor(private db :AngularFireDatabase,private storage: AngularFireStorage,  private clientService: ClientserviceService, private toastr: ToastrService,private router: Router) { }


  ngOnInit(): void {
    this.clientService.getClientDetailListPaye();
  }

  save(){
    this.clientService.insertPayement(this.payementef);
          this.toastr.success('Payement réussi !','Nouvelle payement');
          this.router.navigateByUrl('/animal/clients');
  }
}
export class Paye{
  cniclient:string;
  date:string;
  montant:string;
}
