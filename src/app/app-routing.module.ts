import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { Auth2Guard } from './shared/guard/auth2.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestComponent } from './test/test.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch:'full' },
  { path: 'acceuil', component: AcceuilComponent},
  {path:'test',component:TestComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'futura', loadChildren: () => import('./animals/animals.module').then(m => m.AnimalsModule) },

  { path: '**', component: AcceuilComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
