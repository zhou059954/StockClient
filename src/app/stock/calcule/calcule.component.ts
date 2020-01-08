import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calcule',
  templateUrl: './calcule.component.html',
  styleUrls: ['./calcule.component.scss']
})
export class CalculeComponent implements OnInit {

  statusCode: number;
  requestProcessing = false;
  processValidation = false;
  Hidden: string = "hidden";

  constructor(private router: Router, public dialogRef: MatDialogRef<CalculeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.Hidden;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
