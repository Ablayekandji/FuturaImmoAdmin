import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  

  constructor( public authService: AuthService,private authSrv:AuthService,private router:Router
    ) { }

  ngOnInit() {
    if(this.authSrv.utilisateurConnecte()==true){
      this.router.navigateByUrl('/inaccessible')

    }
  
  }

  
}
