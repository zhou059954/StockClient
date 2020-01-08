import { Routes } from '@angular/router';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AuthGuard } from 'app/_guards';
import { LoginComponent } from 'app/login/login.component';
import { UtilisateurComponent } from 'app/utilisateur/utilisateur.component';
import { HomepageComponent } from 'app/homepage/homepage.component';
import { StockComponent } from 'app/stock/stock.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'utilisateurs', component: UtilisateurComponent, canActivate: [AuthGuard] },
    { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
    { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
    { path: 'icons', component: IconsComponent },
];
