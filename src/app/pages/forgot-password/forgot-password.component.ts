import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MembershipService } from 'src/app/services/membership.service';
import { ToastService } from 'src/app/services/toast.service';
import { EmailSentComponent } from '../email-sent/email-sent.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword: FormGroup;
  emailSent = ''
  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  constructor(private membershipService:MembershipService,private dialogRef: MatDialogRef<ForgotPasswordComponent>,private _matdialog: MatDialog,private _fb: FormBuilder,private toast: ToastService, private router:Router) { }

  ngOnInit(): void {
    this.forgotPassword = this._fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],

    })
  }

  get email(): AbstractControl {
    return this.forgotPassword.get('email');
  }

  dialogClose(){
    this.dialogRef.close();
  }

  backToLogin(){

    this.dialogClose();

    this._matdialog.open(LoginComponent, {
      width: '30%',
      panelClass: 'custom-modal'
    });

  }

async resetPassword(){

let status = await this.membershipService.forgotPassword(this.forgotPassword.value.email)

if(status){

   this.dialogRef.close();
       this._matdialog.open(EmailSentComponent, {
        width: '30%',
        panelClass: 'custom-modal'
      });

}


  }

}
