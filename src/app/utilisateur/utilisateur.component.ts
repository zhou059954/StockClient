import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagerService } from 'app/_services/app/_services';
import { ConfirmSettings } from 'app/_interface/confirm-settings';
import { ResolveEmit } from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';
import { ConfirmationService } from '@jaspero/ng2-confirmations';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  allUtilisateurs: Utilisateur[];
  statusCode: number;
  requestProcessing = false;
  pager: any = {};
  pagedItems: any[];
  supprimes: Utilisateur;

  settings: ConfirmSettings | any = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Oui',
    declineText: 'Non'
  };


  constructor(private utilisateurService: UtilisateurService,
    private pagerService: PagerService,
    private _confirmation: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllUtilisateurs();
  }
  getAllUtilisateurs() {
    this.utilisateurService.getAllUtilisateur()
      .subscribe(
        data => {
          this.allUtilisateurs = data;
          this.setPage(1);
        },
        errorCode => this.statusCode = errorCode);
  }
  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allUtilisateurs.length, page);
    this.pagedItems = this.allUtilisateurs.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.router.navigate(['/all-utilisateurs'], { queryParams: { page: page } });
  }

  deleteUtilisateur(id_utilisateur: string) {
    this.utilisateurService.getUtilisateurById(id_utilisateur)
      .subscribe(supprimer => {
        this.supprimes = supprimer;
        this._confirmation.create('Utilisateur', 'Voulez-vous vraiment supprmier ' + supprimer.prenom, this.settings)
          .subscribe((ans: ResolveEmit) => {
            if (ans.resolved === true) {
              this.preProcessConfigurations();
              this.utilisateurService.deleteUtilisateurById(id_utilisateur)
                .subscribe(successCode => {
                  this.statusCode = successCode;
                  this.getAllUtilisateurs();
                },
                  errorCode => this.statusCode = errorCode);
              console.log('accepted button clicked');
            } else {
              console.log('decline button clicked');
            }

          });
      });
  }


  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
}
