import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login/login.component';
import { CreateUtilisateurComponent } from './utilisateur/create-utilisateur/create-utilisateur.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create_utilisateur', component: CreateUtilisateurComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }]
  },

  { path: '**', redirectTo: 'login' }

  // { path: 'dashboard',      component: DashboardComponent },
  // { path: 'user-profile',   component: UserProfileComponent },
  // { path: 'table-list',     component: TableListComponent },
  // { path: 'typography',     component: TypographyComponent },
  // { path: 'icons',          component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: 'notifications',  component: NotificationsComponent },
  // { path: 'upgrade',        component: UpgradeComponent },
  // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
