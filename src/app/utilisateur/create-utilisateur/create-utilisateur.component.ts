import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { Utilisateur } from '../../utilisateur/utilisateur';
import * as sha1 from 'js-sha1';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-utilisateur',
  templateUrl: './create-utilisateur.component.html',
  styleUrls: ['./create-utilisateur.component.scss']
})
export class CreateUtilisateurComponent implements OnInit {

  statusCode: number;
  requestProcessing = false;
  utilisateurIdToUpdate = null;
  processValidation = false;
  utilisateur: Utilisateur;

  utilisateurForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    date_naissance: new FormControl('', Validators.required),
    lieu: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mdp: new FormControl('', Validators.required)
  });

  constructor(private utilisateurService: UtilisateurService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {

  }

  onUtilisateurFormSubmit() {
    this.processValidation = true;
    if (this.utilisateurForm.invalid) {
      return;
    }
    this.preProcessConfigurations();

    let nom = this.utilisateurForm.get('nom').value;
    let prenom = this.utilisateurForm.get('prenom').value;
    let date_naissance = this.utilisateurForm.get('date_naissance').value;
    let lieu = this.utilisateurForm.get('lieu').value;
    let email = this.utilisateurForm.get('email').value;
    let mdp = sha1(this.utilisateurForm.get('mdp').value);
    let utilisateur = new Utilisateur(
      null,
      nom,
      prenom,
      date_naissance,
      lieu,
      email,
      mdp
    );
    console.log(JSON.stringify(utilisateur))
    this.utilisateurService.createUtilisateur(utilisateur)
      .subscribe(successCode => {
        this.statusCode = successCode;
      },
        errorCode => this.statusCode = errorCode);
  }

  goBack(): void {
    this.location.back();
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

}
