import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventSuccessPopupComponent } from '../event-success-popup/event-success-popup.component';

@Component({
  selector: 'app-free-event-success',
  templateUrl: './free-event-success.component.html',
  styleUrls: ['./free-event-success.component.scss']
})
export class FreeEventSuccessComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EventSuccessPopupComponent>
) { }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

}
