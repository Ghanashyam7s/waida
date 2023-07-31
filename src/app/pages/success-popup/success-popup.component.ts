import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SuccessPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

    ) { }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

}
