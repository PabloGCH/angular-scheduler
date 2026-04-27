import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login';
import { HomeComponent } from './home/home';
import { userLogged } from './auth/user-logged';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [userLogged] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

