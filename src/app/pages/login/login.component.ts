import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { MembershipService } from 'src/app/services/membership.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { PromotionalBannerComponent } from 'src/app/components/promotional-banner/promotional-banner.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  xpandStatus: false;
  loginForm: FormGroup;
  memberShipForm: FormGroup;
  show:boolean = false;
  hide = true;
  nonMemberForm: FormGroup;
  uploadPercent: Observable<number>;
  membershipData = {
    amount:null,
    purchasedAt:null,
    days:null,
    endsAt:null
  }
 downloadURL: Observable<string>;
  user:any;
  memSubData:any;
  loginCheck;
  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);


  constructor(private _fb: FormBuilder,private toast: ToastService, private router:Router, private membershipService:MembershipService,private storage: AngularFireStorage,
    private _matdialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,private dialogRef2: MatDialogRef<PromotionalBannerComponent>,
  ) { }

  ngOnInit(): void {
    this.membershipService.getUserState()
    .subscribe(user => {
      this.user = user;
      console.log(this.user)

      this.membershipService.getMyMembershipSubscriptions(this.user.uid).subscribe(data=>{
        console.log(data)

        this.memSubData = data
      })
    });

    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [ null, [Validators.required] ],

    })

    this.nonMemberForm = this._fb.group({
        name: [null, [Validators.required,Validators.pattern('.*\\S.*[a-zA-Z ]')]],
        nonMemberEmail: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
        phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
    })
    // this.memberShipForm = this._fb.group({
    //   membershipType: [ null, [Validators.required] ],
    //   membership: [ null, [Validators.required] ],
    //   membershipPlan:[ null, [Validators.required] ],
    //   fName: [ null, [Validators.required] ],
    //   lName: [ null, [Validators.required] ],
    //   speciality: [ null, [Validators.required] ],
    //   password: [ null, [Validators.required] ],
    //   confPassword: [ null, [Validators.required] ],
    //   address: [ null, [Validators.required] ],
    //   email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
    //   phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
    //   profileUrl: [null, [Validators.required]]
    // })
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get name(): AbstractControl {
    return this.nonMemberForm.get('name');
  }

  get nonMemberEmail(): AbstractControl {
    return this.nonMemberForm.get('nonMemberEmail');
  }
  get phone(): AbstractControl {
    return this.nonMemberForm.get('phone');
  }

  // get fName(): AbstractControl {
  //   return this.memberShipForm.get('fName');
  // }
  // get lName(): AbstractControl {
  //   return this.memberShipForm.get('lName');
  // }
  // get email(): AbstractControl {
  //   return this.memberShipForm.get('email');
  // }
  // get phone(): AbstractControl {
  //   return this.memberShipForm.get('phone');
  // }
  // get speciality(): AbstractControl {
  //   return this.memberShipForm.get('speciality');
  // }
  // get password(): AbstractControl {
  //   return this.memberShipForm.get('password');
  // }
  // get confPassword(): AbstractControl {
  //   return this.memberShipForm.get('confPassword');
  // }
  // get address(): AbstractControl {
  //   return this.memberShipForm.get('address');
  // }
  // get profileUrl(): AbstractControl {
  //   return this.memberShipForm.get('profileUrl');
  // }
  passIcon(){
    this.show = !this.show
  }


 async saveNonMemner(){
    if (this.nonMemberForm.invalid) {
      this.toast.openSnackBar('Enter Valid Form');
      this.nonMemberForm.markAllAsTouched();
      return;
    }
    await this.membershipService.nonMember(this.nonMemberForm.value);
    this.nonMemberForm.reset()
    this.router.navigate(['/our-membership'])
  }


  dialogClose() {
    this.dialogRef.close();
  }

  async loginUser(){
    if (this.loginForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      this.loginForm.markAllAsTouched();
      return;
    }
    try {
      await this.membershipService.login(this.loginForm.value.email,this.loginForm.value.password);
      //console.log(islogedin)
      this.router.navigate(['/profile/details'])
      this.dialogClose();
      this._matdialog.open(PromotionalBannerComponent, {
      width: '50%',
      panelClass: 'custom-modal'
    });
    this.toast.openSnackBar(' You Logged in Successfully');




    } catch(error) {
      console.log(JSON.stringify(error));
      if(error.code === 'auth/user-not-found'){
        this.toast.openSnackBar('User not exit');
      } else{
         this.toast.openSnackBar(error.message);
      }

    }
  }



  // async addMembership(bookMembership : NgForm){


  //   if(this.user !== null){

  //     for(let mem of this.memSubData){

  //       console.log(mem.endsAt.toDate().getTime())

  //        if(mem.endsAt.toDate().getTime() > new Date().getTime()){

  //           this.toast.openSnackBar(
  //             'you already a member'
  //           );

  //           this.memberShipForm.markAllAsTouched();
  //           return;


  //        }

  //     }

  //   }




  //   if (this.memberShipForm.invalid) {
  //     this.toast.openSnackBar(
  //       'Membership Not Successful, Enter Valid Details'
  //     );

  //     this.memberShipForm.markAllAsTouched();
  //     return;
  //   }

  //   if (this.memberShipForm.value.password.length < 6) {
  //     this.toast.openSnackBar(
  //       'Password must be 6 characters'
  //     );

  //     this.memberShipForm.markAllAsTouched();
  //     return;
  //   }

  //   if(this.memberShipForm.value.password !== this.memberShipForm.value.confPassword){
  //     this.toast.openSnackBar(
  //       'Password and Confirm password should be same'
  //     );

  //     this.memberShipForm.markAllAsTouched();
  //     return;
  //   }



  //   // if(this.memSubData){
  //   //   this.toast.openSnackBar(
  //   //     'Password and Confirm password should be same'
  //   //   );

  //   //   this.memberShipForm.markAllAsTouched();
  //   //   return;
  //   // }










  //   console.log(this.memberShipForm.value)

  //   var currentDate = new Date();
  //   // to add 4 days to current date
  //  //const vv = currentDate.addDays(4);


  //  var date = moment()
  //  .add(2,'d')
  //  .toDate();

  //   this.membershipData.amount = "900";
  //   this.membershipData.purchasedAt = new Date();
  //   this.membershipData.days = this.memberShipForm.value.membershipPlan
  //   this.membershipData.endsAt = moment()
  //   .add(this.memberShipForm.value.membershipPlan,'d')
  //   .toDate();
  //   //this.membershipData.durationInDays = new Date();

  //   console.log(this.membershipData.endsAt)

  //   //currentDate.addDays(4);
  //   console.log(this.membershipData.days)


  //   // this.membershipData.amount = "900";

  //   // this.membershipData.amount = "900";

  //   // this.membershipData.amount = "900";

  //   console.log(this.membershipData)




  //   await this.membershipService.membership(
  //     this.memberShipForm.value, this.membershipData
  //   );

  //   bookMembership.resetForm();
  //   this.dialogClose();

  //   this._matdialog.open(PromotionalBannerComponent, {
  //     width: '50%',
  //     panelClass: 'custom-modal'
  //   });



  //   }



  closePopUp(){
    this.dialogRef.close();

  }

  closePopUp2(){

    this.dialogRef.close();


  }



  readMore(){

    this.dialogRef.close();

  }



  uploadFile(fileList: FileList) {
    console.log(fileList);

    const file = fileList.item(0);
    console.log(file);
    const filePath = `/ramibro/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(dataUrl=>{
        //  this.profileUrl.setValue(dataUrl);
        }))
     )
    .subscribe()
  }


  openForgotPopup(){
    this.dialogClose();

    this._matdialog.open(ForgotPasswordComponent, {
      width: '30%',
      panelClass: 'custom-modal'
    });

  }

}
