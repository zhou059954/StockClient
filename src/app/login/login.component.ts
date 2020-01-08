import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'app/_services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as sha1 from 'js-sha1';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  statusCode: number;
  requestProcessing = false;
  processValidation = false;
  loading = false;
  returnUrl: string;



  utilisateurForm = new FormGroup({
    login: new FormControl('', Validators.required),
    mdp: new FormControl('', Validators.required)
  });

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }



  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    /*this.test = JSON.parse(localStorage.getItem('currentUser'));
    console.log("ok " + JSON.stringify(this.test));*/
  }

  /* getLoginUtilisateur(login: string, mdp: string) {
     this.utilisateurService.getLoginUtilisateurs(login, mdp)
       .subscribe(
         data =>
           this.LoginUtilisateurs = data,
         errorCode => this.statusCode = errorCode);
   }
 */
  login() {
    this.processValidation = true;
    if (this.utilisateurForm.invalid) {
      return;
    }
    this.preProcessConfigurations();
    this.loading = true;
    let login = this.utilisateurForm.get('login').value.trim();
    let mdp = sha1(this.utilisateurForm.get('mdp').value.trim());

    //console.log(login, mdp);
    this.authenticationService.login(login, mdp)
      .subscribe(
        data => {

          this.router.navigate(["/homepage"]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

    this.authenticationService.login(login, mdp)
      .subscribe(successCode => {
        this.statusCode = successCode;
      },
        errorCode => this.statusCode = errorCode);
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

}
