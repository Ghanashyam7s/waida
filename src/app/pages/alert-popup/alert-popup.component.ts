import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss']
})
export class AlertPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertPopupComponent>,
    private _matdialog: MatDialog) { }
    
      ngOnInit(): void {
      }
    
      dialogClose() {
        this.dialogRef.close();
      }

      openLogin(){
        this.dialogClose();
        
          this._matdialog.open(LoginComponent, {
            width: '30%',
            panelClass: 'custom-modal'
          });
          
        }

      

}
