import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/admin/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

import { AuthenticationGuard } from './guards/authentication-guard';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthenticationGuard]},
  {path: 'user/:id', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
