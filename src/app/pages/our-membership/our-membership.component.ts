import { environment } from 'src/environments/environment';
import { Membership } from './../../models/membership.model';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MembershipService } from 'src/app/services/membership.service';
import { ToastService } from 'src/app/services/toast.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { PromotionalBannerComponent } from 'src/app/components/promotional-banner/promotional-banner.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { MatRadioChange } from '@angular/material/radio';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { FailurePopupComponent } from '../failure-popup/failure-popup.component';
import { SoonPopUpComponent } from 'src/app/components/soon-pop-up/soon-pop-up.component';
@Component({
  selector: 'app-our-membership',
  templateUrl: './our-membership.component.html',
  styleUrls: ['./our-membership.component.scss']
})
export class OurMembershipComponent implements OnInit {
  showPaypal = false;
/* --------------------------------- Fields --------------------------------- */

  public benefitsConfig: SwiperConfigInterface = {};
  memberShipForm: FormGroup = this._fb.group({
    membershipType: [null, [Validators.required]],
   // membership: [null],
    membershipPlan: [null, [Validators.required]],
    firstName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    lastName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    speciality: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    confPassword: [null, [Validators.required]],
  //  address: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
    phone: [null, [Validators.required, Validators.pattern(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/)]],
    profileUrl: [null],
    studentDetails:[null],
    addressLineOne:[null,[Validators.required]],
    addressLineTwo:[null,[Validators.required]],
    city:[null,[Validators.required]],
    state:[null,[Validators.required]],
    postalCode:[null,[Validators.required]]


  });
  membershipPrice: number;
  banners: any;
  user: any;
  hide = true;
  hideChoose:boolean = true;
  hide2 = true;
  uploadPercent: Observable<number>;
  memSubData: any;

  membershipData = {
    amount: null,
    purchasedAt: null,
    days: null,
    endsAt: null,
    email: null,
    name:null,
    payload: null
  }
  downloadURL: Observable<string>;
  // Paypal Config
  public payPalConfig?: IPayPalConfig;
  constructor(
    private _fb: FormBuilder, private router:Router, private spinner: NgxSpinnerService, private membershipService: MembershipService, private toast: ToastService, private storage: AngularFireStorage, private _matdialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.initConfig();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
    // setTimeout(() => {
    //   window.scroll(0,610);
    // }, 500);
    this.membershipService.getMembershipBanners().subscribe(data => {
      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });
      console.log(this.banners)
    })
    this.membershipService.getUserState()
      .subscribe(user => {
        this.user = user;
        console.log(this.user)
        this.membershipService.getMyMembershipSubscriptions(this.user.uid).subscribe(data => {
          console.log(data)
          this.memSubData = data
        })
      });

  }
  ngAfterViewInit() {
    this.benefitsConfig = {
      direction: 'horizontal',
      slidesPerView: 4,
      speed: 2000,
      spaceBetween: 15,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      keyboard: true,
      loop: false,
      longSwipes: true,
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: false,
      // autoplay: true,
      slidesOffsetAfter: 0,
      pagination: true,
      navigation: {
        nextEl: '.benefits-button-next',
        prevEl: '.benefits-button-prev',
      },
      breakpoints: {
        240: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    }
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'AUD',
      clientId: environment.paypal.clientId,
      onInit: (data, actions)=> {

      },
      createOrderOnClient: (data) => {
        const memberData: Membership  = this.memberShipForm.value;
        console.log(memberData)
        let amount: string = '250.00';
        let subscriptionName = memberData.membershipType === 'studentMember' ?
        'Student membership' : 'Full membership'
        if(memberData.membershipType === 'studentMember'){
          amount = '50.00';
        }

        const orderRequest = <ICreateOrderRequest>{
          payer: {
            name: {
              // full_name : `${memberData.firstName} ${memberData.lastName}`,
              surname: memberData.lastName
            } ,
            email_address: memberData.email,
            address: {
              country_code: "AU",
              address_line_1: memberData.addressLineOne,
              address_line_2: memberData.addressLineTwo,
              admin_area_1: memberData.state,
              admin_area_2: memberData.city,
              postal_code: memberData.postalCode
            }
          },
          intent: 'CAPTURE',
          purchase_units: [
            {
              payee: {
                email_address: environment.paypal.merchantEmail,
                merchant_id: environment.paypal.merchantId
              },
            amount: {
              currency_code: 'AUD',
              value: amount,
              breakdown: {
                item_total: {
                  currency_code: 'AUD',
                  value: amount
                }
              }
            },
            items: [{
              name: subscriptionName,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'AUD',
                value: amount,
              },
            }]
          }]
        }
        console.log(JSON.stringify(orderRequest));
        return orderRequest;

      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {

        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
        /* actions.order.authorize().then(details=>{
          console.log('onAuthorize - you can get full order details inside onAuthorize: ', details);
        })*/
        actions.order.capture().then(function(details) {
          // This function shows a transaction success message to your buyer.
          console.log('onCapture - transaction details: ', details);
          // alert('Transaction completed by ' + details.payer.name.given_name);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.openSuccessDialog(data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this._matdialog.open(FailurePopupComponent, {
          width: '40%',
          panelClass: 'custom-modal'
        });
        //this.showCancel = true;
      },
      onError: err => {
        console.log('OnError', err);
        this.openErrorDialog();
      }
    };
  }

  openErrorDialog(){
    alert('Error')
  }
  async openSuccessDialog(data: any){
    this.spinner.show()
    this.membershipData.payload = data;
    try {
     ;
       const resultDta = await this.membershipService.membership(this.memberShipForm.value, this.membershipData);
       this.spinner.hide();
     // this.toast.openSnackBar('Membership Added Successfully');
      this._matdialog.open(SuccessPopupComponent, {
        width: '40%',
        panelClass: 'custom-modal',
        data:data.id
      });
    } catch(error){
      this.spinner.hide();
      this.toast.openSnackBar('Something went wrong. contact administrator');
    }
  }
  get membershipType(): AbstractControl {
    return this.memberShipForm.get('membershipType');
  }
  // get membership(): AbstractControl {
  //   return this.memberShipForm.get('membership');
  // }
  get membershipPlan(): AbstractControl {
    return this.memberShipForm.get('membershipPlan');
  }
  get firstName(): AbstractControl {
    return this.memberShipForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.memberShipForm.get('lastName');
  }
  get email(): AbstractControl {
    return this.memberShipForm.get('email');
  }
  get phone(): AbstractControl {
    return this.memberShipForm.get('phone');
  }
  get speciality(): AbstractControl {
    return this.memberShipForm.get('speciality');
  }
  get password(): AbstractControl {
    return this.memberShipForm.get('password');
  }

  get studentDetails(): AbstractControl {
    return this.memberShipForm.get('studentDetails');
  }

  get confPassword(): AbstractControl {
    return this.memberShipForm.get('confPassword');
  }
  // get address(): AbstractControl {
  //   return this.memberShipForm.get('address');
  // }
  get profileUrl(): AbstractControl {
    return this.memberShipForm.get('profileUrl');
  }

  get addressLineOne(): AbstractControl {
    return this.memberShipForm.get('addressLineOne');
  }

  get city(): AbstractControl {
    return this.memberShipForm.get('city');
  }

  get state(): AbstractControl {
    return this.memberShipForm.get('state');
  }
  get addressLineTwo(): AbstractControl {
    return this.memberShipForm.get('addressLineTwo');
  }

  get postalCode(): AbstractControl {
    return this.memberShipForm.get('postalCode');
  }

  setCustomValidity(ev: MatRadioChange){
    console.log(ev);
    if(ev.value === 'fullMember'){

      console.log("mmmmmmmmmmmmmmmmmmmm")

    //  this.memberShipForm.get('membership').setValidators([Validators.required]);
      this.memberShipForm.get('studentDetails').clearValidators();

      //this.membership
      this.memberShipForm.updateValueAndValidity();
    }

    if(ev.value === 'studentMember'){
     // this.membership.clearValidators();

      this.memberShipForm.get('studentDetails').setValidators([Validators.required]);
     // this.memberShipForm.get('membership').clearValidators();
      this.memberShipForm.updateValueAndValidity();
     // this.studentDetails.setValidators([Validators.required]);
    }

    this.memberShipForm.updateValueAndValidity();

  }
  async checkValidity() {

    console.log(this.memberShipForm.value)


    if (this.memberShipForm.invalid) {
      this.toast.openSnackBar(
        'Membership Not Successful, Enter Valid Details'
      );
      this.memberShipForm.markAllAsTouched();
      return;
    }

    if (this.memberShipForm.value.password !== this.memberShipForm.value.confPassword) {
      this.toast.openSnackBar(
        'Password and Confirm password should be same'
      );
      this.memberShipForm.markAllAsTouched();
      return;
      }

    var currentDate = new Date();
    if(this.memberShipForm.value.membershipType === "fullMember"){
      this.membershipPrice = 250
    // if(new Date().getTime() > new Date(2021, 1, 25).getTime() && new Date().getTime() < new Date(2021, 1, 13).getTime()){
    //   this.membershipPrice = 200
    //   console.log(this.membershipPrice)
    // } else{
    //   this.membershipPrice = 250
    // }
  }

    if(this.memberShipForm.value.membershipType === "studentMember"){
      this.membershipPrice = 50
      console.log(this.membershipPrice)
    }
    this.membershipData.amount = this.membershipPrice;
    this.membershipData.purchasedAt = new Date();
    this.membershipData.days = this.memberShipForm.value.membershipPlan
    this.membershipData.email = this.memberShipForm.value.email
    this.membershipData.name = this.memberShipForm.value.firstName
    this.membershipData.endsAt = moment()
      .add(this.memberShipForm.value.membershipPlan, 'd')
      .toDate();
    try {
       const result =  await this.membershipService.checkLoginExist(this.email.value);
       if(result.length === 0){
        this.showPaypal = true;
       } else {
         throw new Error("User already Exist");
       }
    } catch(e){
      this.toast.openSnackBar(e.message)
    }
  }

  fullMembership(){
    this.hideChoose = true;
    this.membershipPrice = 250
    // if(new Date().getTime() > new Date(2021, 0, 27).getTime() && new Date().getTime() < new Date(2021, 1, 13).getTime()){
    //   this.membershipPrice = 200
    // } else{
    //   this.membershipPrice = 250
    // }
  }

  studentMembership(){
    this.hideChoose = false;
     this.membershipPrice = 50;
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
      finalize(() => fileRef.getDownloadURL().subscribe(dataUrl => {
        this.profileUrl.setValue(dataUrl);
      }))
    )
      .subscribe()
  }
  onIndexChange() {
  }


async  dataMembership(bookMembership:any){


    console.log(this.memberShipForm.value)

    this._matdialog.open(SoonPopUpComponent, {
      width: '40%',
      panelClass: 'custom-modal'
    });


    if (this.memberShipForm.invalid) {
      // this.toast.openSnackBar(
      //   'Membership Not Successful, Enter Valid Details'
      // );
      this.memberShipForm.markAllAsTouched();
      return;
    }

    if (this.memberShipForm.value.password !== this.memberShipForm.value.confPassword) {
      // this.toast.openSnackBar(
      //   'Password and Confirm password should be same'
      // );
      this.memberShipForm.markAllAsTouched();
      return;
      }

    var currentDate = new Date();
    if(this.memberShipForm.value.membershipType === "fullMember"){

      this.membershipPrice = 250
    // if(new Date().getTime() > new Date(2021, 1, 25).getTime() && new Date().getTime() < new Date(2021, 1, 13).getTime()){
    //   this.membershipPrice = 200
    //   console.log(this.membershipPrice)
    // } else{
    //   this.membershipPrice = 250
    // }
  }

    if(this.memberShipForm.value.membershipType === "studentMember"){
      this.membershipPrice = 50
      console.log(this.membershipPrice)
    }
    this.membershipData.amount = this.membershipPrice;
    this.membershipData.purchasedAt = new Date();
    this.membershipData.days = this.memberShipForm.value.membershipPlan
    this.membershipData.email = this.memberShipForm.value.email
    this.membershipData.name = this.memberShipForm.value.firstName
    this.membershipData.endsAt = moment()
      .add(this.memberShipForm.value.membershipPlan, 'd')
      .toDate();



  //   try {
  //      const result =  await this.membershipService.checkLoginExist(this.email.value);
  //      if(result.length === 0){
  //      // this.showPaypal = true;

  //      const resultDta = await this.membershipService.membership(this.memberShipForm.value, this.membershipData);
  //      if(resultDta){
  //       bookMembership.resetForm()
  //       this.toast.openSnackBar(
  //         'Your membership added successfully'
  //       );
  //      }


  //      } else {
  //        throw new Error("User already Exist");


  //      }
  //   } catch(e){
  //     this.toast.openSnackBar(e.message)


  // }

}


// openPopup(){

//   this._matdialog.open(SoonPopUpComponent, {
//     width: '40%',
//     panelClass: 'custom-modal'
//   });

// }

}
