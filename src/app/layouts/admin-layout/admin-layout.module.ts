import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatDialog, MatDialogModule, MatSelectModule, MatCheckboxModule, MatAutocompleteModule } from '@angular/material';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PagerService } from 'app/_services/app/_services';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';
import { UtilisateurComponent } from 'app/utilisateur/utilisateur.component';
import { UpdateUtilisateurComponent } from 'app/utilisateur/update-utilisateur/update-utilisateur.component';
import { UtilisateurService } from 'app/utilisateur/utilisateur.service';
//import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { HomepageComponent } from 'app/homepage/homepage.component';
import { AppComponent } from 'app/app.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { AlertComponent } from 'app/_directives';
import { StockService } from 'app/stock/stock.service';
import { StockComponent } from 'app/stock/stock.component';
import { CalculeComponent } from 'app/stock/calcule/calcule.component';
import { MoinComponent } from 'app/stock/moin/moin.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    HttpClientModule,
    HttpModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    ChartsModule,
    JasperoConfirmationsModule,
    MatCheckboxModule,
    DragulaModule,
    MatAutocompleteModule
  ],


  declarations: [
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UtilisateurComponent,
    UpdateUtilisateurComponent,
    HomepageComponent,
    AlertComponent,
    StockComponent,
    CalculeComponent,
    MoinComponent
  ],

  entryComponents: [
    CalculeComponent,
    MoinComponent
  ],

  providers: [
    DatePipe,
    PagerService,
    UtilisateurService,
    DragulaService,
    StockService
  ]


})

export class AdminLayoutModule { }
