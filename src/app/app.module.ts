import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService } from './_services';
import { fakeBackendProvider } from './_helpers';
//import { UtilisateurService } from './utilisateur/utilisateur.service';
import { MatButtonModule, MatRippleModule, MatInputModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatDialogModule, MatSelectModule, MatProgressSpinnerModule } from '@angular/material';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import { CreateUtilisateurComponent } from './utilisateur/create-utilisateur/create-utilisateur.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    RouterModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    CreateUtilisateurComponent
  ],

  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UtilisateurService,
    // UtilisateurService,
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
