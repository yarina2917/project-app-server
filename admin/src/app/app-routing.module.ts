import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './components/admin/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication-guard';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { HomeComponent } from './components/home/home.component';
import { MediaComponent } from './components/media/media.component';
import { MediaAccessComponent } from './components/media/media-access/media-access.component';

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: AdminComponent, canActivate: [AuthenticationGuard]},
  {path: 'user/:id', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'graphics', component: GraphicsComponent, canActivate: [AuthenticationGuard]},
  {path: 'media', component: MediaComponent, canActivate: [AuthenticationGuard]},
  {path: 'media/:id', component: MediaAccessComponent, canActivate: [AuthenticationGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
