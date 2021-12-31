import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor( public authService: AuthService,private authSrv:AuthService,private router:Router
    ) { }

  ngOnInit() {
    if(this.authSrv.utilisateurConnecte()==true){
      this.router.navigateByUrl('/inaccessible')

    }
  
  }


}
