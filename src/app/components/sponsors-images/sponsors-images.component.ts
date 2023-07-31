import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberDetailsComponent } from '../member-details/member-details.component';

@Component({
  selector: 'app-sponsors-images',
  templateUrl: './sponsors-images.component.html',
  styleUrls: ['./sponsors-images.component.scss']
})
export class SponsorsImagesComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MemberDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

}
