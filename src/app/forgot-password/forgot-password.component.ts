import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( public authService: AuthService,private authSrv:AuthService,private router:Router
    ) { }

  ngOnInit() {
    if(this.authSrv.utilisateurConnecte()==true){
      this.router.navigateByUrl('/inaccessible')

    }
  
  }


}
