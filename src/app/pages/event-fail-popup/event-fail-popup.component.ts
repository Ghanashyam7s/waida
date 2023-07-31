import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-fail-popup',
  templateUrl: './event-fail-popup.component.html',
  styleUrls: ['./event-fail-popup.component.scss']
})
export class EventFailPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EventFailPopupComponent>) { }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

}
