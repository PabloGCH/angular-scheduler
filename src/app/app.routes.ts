import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login';
import { HomeComponent } from './home/home';
import { userLogged } from './auth/user-logged';
import { AppointmentDetailComponent } from './appointments/appointment-detail/appointment-detail';
import { NewAppointmentComponent } from './appointments/new-appointment/new-appointment';
import { ConfigurationComponent } from './configuration/configuration';
import { ChooseAppointmentComponent } from './appointments/choose-appointment/choose-appointment';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [userLogged] },
  { path: 'appointment/:id', component: AppointmentDetailComponent, canActivate: [userLogged] },
  { path: 'new-appointment', component: NewAppointmentComponent, canActivate: [userLogged] },
  { path: 'configuration', component: ConfigurationComponent, canActivate: [userLogged] },
  { path: 'choose-appointment/:code', component: ChooseAppointmentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
