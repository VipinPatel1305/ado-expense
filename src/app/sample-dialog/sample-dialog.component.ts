import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {ServerResponse} from '../ServerResponse';
@Component({
  selector: 'app-sample-dialog',
  templateUrl: './sample-dialog.component.html',
  styleUrls: ['./sample-dialog.component.css']
})


export class SampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SampleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ServerResponse) {}

  onNoClick(): void {
  	console.log("clicked ====");
    this.dialogRef.close();
  }

}