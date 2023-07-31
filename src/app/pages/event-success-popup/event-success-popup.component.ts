import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-success-popup',
  templateUrl: './event-success-popup.component.html',
  styleUrls: ['./event-success-popup.component.scss']
})
export class EventSuccessPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EventSuccessPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

    ) { }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

}
