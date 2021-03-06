import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { UserProfileComponent } from './components/admin/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { MediaComponent } from './components/media/media.component';
import { MediaTabComponent } from './components/media/media-tab/media-tab.component';
import { MediaAccessComponent } from './components/media/media-access/media-access.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule,
  MatDialogModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserProfileComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    GraphicsComponent,
    HeaderComponent,
    HomeComponent,
    ModalInfoComponent,
    MediaComponent,
    MediaTabComponent,
    MediaAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ModalInfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
