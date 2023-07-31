import { AbstractControl, FormBuilder, FormGroup, Validators,NgForm} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SponsorsService } from 'src/app/services/sponsors.service';
@Component({
  selector: 'app-sponsor-register',
  templateUrl: './sponsor-register.component.html',
  styleUrls: ['./sponsor-register.component.scss']
})
export class SponsorRegisterComponent implements OnInit {
  sponsorForm: FormGroup;
  hide = true;
  hide2 = true;
  uploadPercent: Observable<number>;
  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
  constructor(
    private _fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastService,
    private storage: AngularFireStorage,
    private sponsorsService:SponsorsService,
    private dialogRef: MatDialogRef<SponsorRegisterComponent>,
  ) { }
  ngOnInit(): void {
    this.sponsorForm = this._fb.group({
      firstName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
      lastName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
      message: [null, [Validators.required]]

    });
  }


  dialogClose() {
    this.dialogRef.close();
  }

  get firstName(): AbstractControl {
    return this.sponsorForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.sponsorForm.get('lastName');
  }
  get email(): AbstractControl {
    return this.sponsorForm.get('email');
  }
  get phone(): AbstractControl {
    return this.sponsorForm.get('phone');
  }

  get message(): AbstractControl {
    return this.sponsorForm.get('message');
  }



  async addSponsorship(bookMembership: NgForm) {

    if (this.sponsorForm.invalid) {
      this.toast.openSnackBar(
        //'Sponsorship Register Not Successful, Enter Valid Details'
        'Enter Valid Details'
      );
      this.sponsorForm.markAllAsTouched();
      return;
    }

    console.log(this.sponsorForm.value)


    const resultDta = await this.sponsorsService.sponsorship(
      this.sponsorForm.value
    );

    if(resultDta){

      bookMembership.resetForm();

      this.dialogRef.close();

      this.toast.openSnackBar(
        'You Submitted Successfully'
      );

    }


  }



}
