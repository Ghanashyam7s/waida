import { Component, OnInit } from '@angular/core';
import { MembershipService } from 'src/app/services/membership.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AbstractControl, FormBuilder, FormGroup,NgForm, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  profileForm: FormGroup;
  user:any;
  fileName:any;
  hide:boolean = true
  uploadPercent: Observable<number>;
  myProfile:any;
  currentMember:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  userImage = {
    image:null
  }

  updateData={
   // firstname:null,
    role:null,
    phone:null
  }

  constructor(private membershipService: MembershipService,private spinner: NgxSpinnerService,private profileService:ProfileService, private storage: AngularFireStorage, private _fb: FormBuilder,private toast: ToastService) { }

  ngOnInit(): void {

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);

    this.membershipService.getUserState()
    .subscribe(user => {
      this.user = user;
      console.log(this.user)

      this.profileService.getCurrentUserData(this.user.uid).subscribe(data=>{

        console.log(data)

        this.currentMember = data

      })


      this.profileService.getProfile(this.user.uid).subscribe(data=>{

        this.myProfile = data
       // console.log(this.myProfile)


        this.profileForm.patchValue({

        name : this.user.displayName,
        role: this.myProfile.role,
        phone: this.myProfile.phone,
        email: this.user.email,

      })
      })

      // if(user){
      //   this.dialogRef.close();
      // }
    })



    this.profileForm = this._fb.group({
      name: [null, [Validators.required]],
      role: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      //profileUrl:[null, [Validators.required]]
    });





  }


  // get profileUrl(): AbstractControl {
  //   return this.profileForm.get('profileUrl');
  // }


 async updateUserProfile(){


  if (this.profileForm.invalid) {
    this.toast.openSnackBar(
      'Enter Valid Details to update your details'
    );

    this.profileForm.markAllAsTouched();
    return;
  }

  //let name = this.profileForm.value.displayName

  this.updateData.phone = this.profileForm.value.phone
  this.updateData.role = this.profileForm.value.role

  console.log(this.updateData)


  console.log(this.profileForm.value)

 // delete this.profileForm.value.displayName;

 await this.profileService.updateProfile(this.updateData,this.user.uid,this.profileForm.value.name)

  this.hide = false


 this.membershipService.getUserState()
 .subscribe(user => {
   this.user = user;
   console.log(this.user)
 });

 this.profileForm.patchValue({

  name : this.user.displayName

})


this.profileService.updateProfileImage(this.croppedImage,this.user.uid)


  }



uploadFile(fileList: FileList) {
   // console.log(fileList);

    this.fileName = fileList.item(0);
    // console.log(file);
    // const filePath = `/ramibro/${file.name}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(filePath, file);

    // this.uploadPercent = task.percentageChanges();
    // // get notified when the download URL is available
    // task.snapshotChanges().pipe(
    //     finalize(() => fileRef.getDownloadURL().subscribe(dataUrl=>{
    //       console.log(dataUrl)
    //       this.userImage.image = dataUrl

    //       this.profileService.updateProfileImage(this.userImage,this.user.uid)





    //    // this.membershipService.updateUserImage(dataUrl)

    //       //this.profileUrl.setValue(dataUrl);

    //     }))
    //  )
    // .subscribe()
  }





  fileChangeEvent(event: any): void {
      this.hide = true
      this.imageChangedEvent = event;
      console.log(this.imageChangedEvent)
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(this.croppedImage)

      this.userImage.image = this.croppedImage




     // const file = fileList.item(0);
     // console.log(file);
      // const filePath = `/ramibro/${this.croppedImage}`;
      // const fileRef = this.storage.ref(filePath);
      // const task = this.storage.upload(filePath, this.fileName);

      // this.uploadPercent = task.percentageChanges();
      // // get notified when the download URL is available
      // task.snapshotChanges().pipe(
      //     finalize(() => fileRef.getDownloadURL().subscribe(dataUrl=>{
      //       console.log(dataUrl)
      //       this.userImage.image = dataUrl







         // this.membershipService.updateUserImage(dataUrl)

            //this.profileUrl.setValue(dataUrl);

      //     }))
      //  )
      // .subscribe()



  }
  imageLoaded(image: HTMLImageElement) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }




}
