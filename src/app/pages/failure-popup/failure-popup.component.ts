import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-failure-popup',
  templateUrl: './failure-popup.component.html',
  styleUrls: ['./failure-popup.component.scss']
})
export class FailurePopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<FailurePopupComponent>) { }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

}
