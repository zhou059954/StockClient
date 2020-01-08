import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Utilisateur } from 'app/utilisateur/utilisateur';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmSettings } from 'app/_interface/confirm-settings';
import { PagerService } from 'app/_services/app/_services';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  statusCode: number;
  currentUser: Utilisateur;
  id_playlist: string;
  nom: string;
  nom_newplaylist: string;
  pager: any = {};
  pagedItems: any[];
  date_album: string;
  heure_album: string;

  settings: ConfirmSettings | any = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Oui',
    declineText: 'Non'
  };
  constructor(public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getDateHeure();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getDateHeure() {
    let date = new Date();
    this.date_album;
    date.setDate(date.getDate());
    this.date_album = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    let heure = date.getHours();
    let minute = date.getMinutes();
    let seconde = date.getSeconds();
    this.heure_album = ("0" + heure).slice(-2) + ":" + ("0" + minute).slice(-2) + ":" + ("0" + seconde).slice(-2);
    console.log(this.date_album);

  }

}
