import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-soon-pop-up',
  templateUrl: './soon-pop-up.component.html',
  styleUrls: ['./soon-pop-up.component.scss']
})
export class SoonPopUpComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SoonPopUpComponent>) { }

  ngOnInit(): void {
  }

}
