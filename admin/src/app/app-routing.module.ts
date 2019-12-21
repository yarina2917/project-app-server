import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './components/admin/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication-guard';
import { GraphicsComponent } from "./components/pages/graphics/graphics.component";
import { HomeComponent } from "./components/pages/home/home.component";

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'users', component: AdminComponent, canActivate: [AuthenticationGuard]},
  {path: 'user/:id', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'graphics', component: GraphicsComponent, canActivate: [AuthenticationGuard]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
