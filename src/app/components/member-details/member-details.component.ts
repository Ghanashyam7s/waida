import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MemberDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }
  dialogClose(result?: any) {
    this.dialogRef.close(result ? result : null);
  }
}
