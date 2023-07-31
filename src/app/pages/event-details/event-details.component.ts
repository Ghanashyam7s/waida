import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  NgForm,
  FormArray
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { ToastService } from 'src/app/services/toast.service';
import { MembershipService } from 'src/app/services/membership.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { eventDetails } from 'src/app/models/eventDetails';
import { environment } from 'src/environments/environment';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { MatDialog } from '@angular/material/dialog';
import { EventSuccessPopupComponent } from '../event-success-popup/event-success-popup.component';
import { EventFailPopupComponent } from '../event-fail-popup/event-fail-popup.component';
import { FreeEventSuccessComponent } from '../free-event-success/free-event-success.component';
import { AlertPopupComponent } from '../alert-popup/alert-popup.component';

const CHILDMINAGE: number = 12;
const CHILDMAXAGE: number = 18;
//import { Swiper } from 'swiper';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  enrollForm: FormGroup;
  eventDetails: any;
  hideDate: boolean = true
  showPaypal: boolean = false;
  user: any;
  pValue: any;
  cValue: any;
  evPrice: number;
  childEvPrice: number;
  childUnitPrice: number;
  unitPrice: number;
  quantityData: any;
  childQuantityData: number = 0;
  pastEvents: boolean = false;
  banners: any;
  enroll: any;
  lat: any;
  lng: any;
  disclaimerData: any;
  showErr: boolean = false
  bookedMembers: any;
  bookedMembersLen: number = 0
  grandTotal: any;
  public eventdetailsConfig: SwiperConfigInterface = {};
  public payPalConfig?: IPayPalConfig;
  totalQuantity: number;
  constructor(private _fb: FormBuilder, private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute, private eventsService: EventsService, private toast: ToastService, private membershipService: MembershipService, private _matdialog: MatDialog) { }
  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);
  
  
  ngOnInit(): void {


    this.enrollForm = this._fb.group({
      persons: [null, [Validators.required]],
      childPersons: [null, [Validators.required]],
      disclaimer: [false, [Validators.required]],
      adultPerson: this._fb.array([]),
      childPerson: this._fb.array([])
    });

    console.log("This.adultPrson: ", this.adultPerson());
    console.log("This.childPerson: ", this.childPerson());


    this.initConfig();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
    // setTimeout(() => {
    //   window.scroll(0,610);
    // }, 500);
    this.eventsService.getEventDetailsBanners().subscribe(data => {
      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });
      // console.log(this.banners)
    })

    this.eventsService.getDisclimer().subscribe(data => {

      this.disclaimerData = data.disclaimer

      //  console.log(this.disclaimerData)

    })


    this.activeRoute.params.subscribe((params) => {

      this.membershipService.getUserState().subscribe(user => {
        this.user = user
        console.log(this.user)


        this.eventsService.getEventDetails(params.id).subscribe(data => {
          console.log("Event data is: ", data);
          this.eventDetails = data
          this.pValue = JSON.parse(this.eventDetails.price);
          this.cValue = JSON.parse(this.eventDetails.pricePerChild);
          //this.eventDetails.limit = 5



          if (this.user) {
            //Commneted to directly set the event price for the members without percentage calculation
            // this.unitPrice = (this.eventDetails.price - (this.eventDetails.price * this.eventDetails.memberDiscountPercentage / 100));
            this.unitPrice = parseInt(this.eventDetails.memberDiscountPercentage);
            this.childUnitPrice = parseInt(this.eventDetails.pricePerChild);
          } else {
            this.unitPrice = parseInt(this.eventDetails.price);
            this.childUnitPrice = parseInt(this.eventDetails.pricePerChild);
          }

          //})
          console.log("THe uinit price is: ", this.unitPrice);
          console.log("THe child unit preie :", this.childUnitPrice);


          //console.log(this.evPrice)
          //this.unitPrice = this.evPrice
          this.evPrice = 0;
          this.childEvPrice = 0;

          if (this.eventDetails.startDate.toDate().toLocaleDateString() === this.eventDetails.endDate.toDate().toLocaleDateString()) {
            this.hideDate = false
          }
          if (new Date().getTime() > this.eventDetails.endDate.toDate().getTime()) {
            this.pastEvents = true
            //console.log(this.pastEvents)
          }

          this.lat = this.eventDetails.latitude
          this.lng = this.eventDetails.longitude
        })
      })






      this.eventsService.getBookedEventMenmbersById(params.id).subscribe(data => {
        this.bookedMembers = data
        this.grandTotal = 0;
        this.bookedMembers.forEach(obj => {
          this.grandTotal += JSON.parse(obj['persons']);

        })
        // for(let single of this.bookedMembers){
        //   let kk =

        //   this.bookedMembersLen = this.bookedMembersLen + JSON.parse(single.persons)
        //   console.log(single)
        // }
        //this.bookedMembersLen = this.bookedMembers.length
        console.log(this.grandTotal)
        //console.log(this.bookedMembers)
      })

    })
    // this.enrollForm = this._fb.group({

    //   // firstName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    //   // lastName: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    //   // phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
    //   // email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
    //   persons: [null, [Validators.required]],
    //   childPersons: [null, [Validators.required]],
    //   disclaimer: [false, [Validators.required]],
    //   adultPerson: this._fb.array([]),
    //   childPerson: this._fb.array([])
    // });
  }
  ngAfterViewInit() {
    this.eventdetailsConfig = {
      direction: 'horizontal',
      slidesPerView: 1,
      speed: 2000,
      fadeEffect: { crossFade: true },
      virtualTranslate: true,
      effect: 'fade',
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      keyboard: true,
      loop: true,
      longSwipes: true,
      preloadImages: false,
      lazy: false,
      pagination: false,
      navigation: {
        nextEl: '.event-details-button-prev',
        prevEl: '.event-details-button-next',
      },
      breakpoints: {
        240: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        991: {
          slidesPerView: 1,
        },
        1200: {
          slidesPerView: 1,
        },
      },
    };
  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'AUD',
      clientId: environment.paypal.clientId,
      onInit: (data, actions) => {

      },
      createOrderOnClient: (data) => {

        const memberData: any = this.enrollForm.value;
        this.totalQuantity = 0;
        // console.log(memberData)
        let totalPrice = this.evPrice + this.childEvPrice;
        let amount: string = `${totalPrice}`;
        console.log("The total quantity is: ", parseInt(memberData.adultPerson.length) + parseInt(memberData.childPerson.length))
        this.totalQuantity = parseInt(memberData.adultPerson.length) + parseInt(memberData.childPerson.length);
        let itemArray = [];
        // form the item array here
        // Store the adult value
        if (memberData.childPersons == 0) {
          itemArray.push({
            name: memberData.adultPerson[0].name,
            // quantity: `${memberData.persons}`,
            quantity: `${memberData.adultPerson.length}`,
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'AUD',
              value: `${this.unitPrice}`,
            },
          });
        } else {
          // Store both adult and child values
          itemArray.push({
            name: memberData.adultPerson[0].name,
            quantity: `${memberData.adultPerson.length}`,
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'AUD',
              value: `${this.unitPrice}`,
            },
          });

        
          // Calculate the child free fee 
          let minAgeChild = 0;
          memberData.childPerson.forEach((child) => {
            if(child.age < 12) {
              minAgeChild += 1;
            }
          });

          // if(minAgeChild > 0) {
          //   // itemArray.push({
          //   //   name: memberData.adultPerson[0].name,
          //   //   quantity: `${minAgeChild}`,
          //   //   category: 'DIGITAL_GOODS',
          //   //   unit_amount: {
          //   //     currency_code: 'AUD',
          //   //     value: `0`
          //   //   }
          //   // });
          // }
          if(memberData.childPerson.length - minAgeChild == 0) {

          }else {
            itemArray.push({
              name: memberData.adultPerson[0].name,
              quantity: `${memberData.childPerson.length - minAgeChild}`,
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'AUD',
                value: `${this.childUnitPrice}`
              }
            });
          }
          
        }

        // let subscriptionName = memberData.membershipType === 'studentMember' ?
        // 'Student membership' : 'Full membership'
        // if(memberData.membershipType === 'studentMember'){
        //   amount = '50.00';
        // }
        this.persons.disable();
        this.childPersons.disable();
        const orderRequest = <ICreateOrderRequest>{
          payer: {
            name: {
              // full_name : `${memberData.firstName} ${memberData.lastName}`,
              surname: memberData.adultPerson[0].name
            },
            // email_address: memberData.email,
            // address: {
            //   country_code: "AU",
            //   address_line_1: memberData.addressLineOne,
            //   address_line_2: memberData.addressLineTwo,
            //   admin_area_1: memberData.state,
            //   admin_area_2: memberData.city,
            //   postal_code: memberData.postalCode
            // }
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
              // items: [{
              //   name: memberData.adultPerson[0].name,
              //   quantity: `${memberData.persons}`,
              //   category: 'DIGITAL_GOODS',
              //   unit_amount: {
              //     currency_code: 'AUD',
              //     value: `${this.unitPrice}`,
              //   },
              // }, {
              //   name: memberData.adultPerson[0].name,
              //   quantity: `${memberData.childPersons}`,
              //   category: 'DIGITAL_GOODS',
              //   unit_amount: {
              //     currency_code: 'AUD',
              //     value: `${this.childUnitPrice}`
              //   }
              // }]
              items: itemArray
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
        actions.order.capture().then(function (details) {
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
        this._matdialog.open(EventFailPopupComponent, {
          width: '30%',
          panelClass: 'custom-modal'
        });
        this.persons.enable();
        this.childPersons.enable();
        //this.showCancel = true;
      },
      onError: err => {
        console.log(err)
        this.persons.enable();
        this.childPersons.enable();
        console.log('OnError', JSON.stringify(err));
        this.openErrorDialog();
      }
    };
  }

  get firstName(): AbstractControl {
    return this.enrollForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.enrollForm.get('lastName');
  }
  get phone(): AbstractControl {
    return this.enrollForm.get('phone');
  }
  get email(): AbstractControl {
    return this.enrollForm.get('email');
  }
  get persons(): AbstractControl {
    return this.enrollForm.get('persons');
  }

  get childPersons(): AbstractControl {
    return this.enrollForm.get('childPersons');
  }

  get disclaimer(): AbstractControl {
    return this.enrollForm.get('disclaimer');
  }


  adultPerson(): FormArray {
    return this.enrollForm.controls["adultPerson"] as FormArray;
    // return this.enrollForm.get["adultPerson"] as FormArray;
  }


  childPerson(): FormArray {
    return this.enrollForm.controls["childPerson"] as FormArray;
    // return this.enrollForm.get["childPerson"] as FormArray;
  }

  async enrollment() {
    console.log(this.enrollForm.value)

    if (this.enrollForm.invalid) {
      if (!this.enrollForm.value.disclaimer) {
        this.showErr = true
      }
      this.toast.openSnackBar(
        'Enter Valid Details To Book This Event'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.enrollForm.markAllAsTouched();
      return;
    }

    if (!this.enrollForm.value.disclaimer) {
      this.showErr = true
      //this.enrollForm.value.disclaimer = null
      this.toast.openSnackBar(
        'Enter Valid Details To Book This Event'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.enrollForm.markAllAsTouched();
      return;
    }



    if (this.eventDetails.maxTickets <= this.grandTotal) {

      this.toast.openSnackBar(
        'Maximum limit is exceeded further bookings are not allowed'
      );

      return;

    }

    /**
     * Show popup if the event is waida event and the user is not logged in. 
     */
    if (this.eventDetails.type == 'WAIDA_EVENTS') {

      // Added condition check to verify it for only_members.
      if (!this.user && this.eventDetails.members == 'ONLY_MEMBERS') {
        this._matdialog.open(AlertPopupComponent, {
          width: '30%',
          panelClass: 'custom-modal'
        });
        return;
      }

    }







    this.showPaypal = true

    console.log(this.showPaypal)
    // if (this.user?.uid) {
    //   console.log(this.user.uid)
    //   this.enrollForm.value.uid = this.user.uid
    // }
    // this.enrollForm.value.eventDate = this.eventDetails.startDate
    // this.enrollForm.value.eventEndDate = this.eventDetails.endDate
    // this.enrollForm.value.eventPrice = this.eventDetails.price
    // this.enrollForm.value.eventLocation = this.eventDetails.location
    // this.enrollForm.value.createdAt = new Date().toLocaleDateString()
    // this.enrollForm.value.eventName = this.eventDetails.title
    // this.enrollForm.value.eventTime = this.eventDetails.time
    // this.enrollForm.value.eventImage = this.eventDetails.image
    // console.log(this.enrollForm.value)
    // const result = await this.eventsService.enrollForEvent(
    //   this.enrollForm.value
    // );
    //this.appointmentBookingForm.reset();
    // if (result) {
    //   enroll.resetForm();
    // }
  }

  async freeEnrollment() {
    console.log(this.enrollForm.value)

    if (this.enrollForm.invalid) {
      // if (!this.enrollForm.value.disclaimer) {
      //   this.showErr = true
      // }
      this.toast.openSnackBar(
        'Enter Valid Details To Book This Event'
      );
      //this.clearForm = true;
      //this.clearForm = true;
      this.enrollForm.markAllAsTouched();
      return;
    }

    // if (!this.enrollForm.value.disclaimer) {
    //   this.showErr = true
    //   //this.enrollForm.value.disclaimer = null
    //   this.toast.openSnackBar(
    //     'Enter Valid Details To Book This Event'
    //   );
    //   //this.clearForm = true;
    //   //this.clearForm = true;
    //   this.enrollForm.markAllAsTouched();
    //   return;
    // }

    if (this.eventDetails.maxTickets <= this.grandTotal) {

      this.toast.openSnackBar(
        'Maximum limit is exceeded further bookings are not allowed'
      );

      return;

    }

    if (this.eventDetails.type == 'WAIDA_EVENTS') {

      if (!this.user) {
        this._matdialog.open(AlertPopupComponent, {
          width: '30%',
          panelClass: 'custom-modal'
        });
        return;
      }

    }




    // async openSuccessDialog(data: any){
    this.spinner.show()
    if (this.user?.uid) {
      console.log(this.user.uid)
      this.enrollForm.value.uid = this.user.uid
    }
    this.enrollForm.value.eventDate = this.eventDetails.startDate
    this.enrollForm.value.eventEndDate = this.eventDetails.endDate
    this.enrollForm.value.eventPrice = "0"
    this.enrollForm.value.eventId = this.eventDetails.id
    this.enrollForm.value.name = this.enrollForm.value.adultPerson[0].name
    this.enrollForm.value.disclaimerData = ""
    this.enrollForm.value.bookingDate = new Date()
    this.enrollForm.value.eventLocation = this.eventDetails.location
    this.enrollForm.value.createdAt = new Date().toLocaleDateString()
    this.enrollForm.value.eventName = this.eventDetails.title
    this.enrollForm.value.eventTime = this.eventDetails.time
    this.enrollForm.value.eventImage = this.eventDetails.image
    this.enrollForm.value.purchasedAmount = 0
    this.enrollForm.value.persons =  parseInt(this.enrollForm.value.adultPerson.length) + parseInt(this.enrollForm.value.childPerson.length);


    //console.log(this.enrollForm.value)
    // const result = await this.eventsService.enrollForEvent(
    //   this.enrollForm.value
    // );
    this.enrollForm.value.payload = {
      create_time: new Date(),
      id: "free event"
    }
    try {

      //const resultDta = await this.membershipService.membership(this.memberShipForm.value, this.membershipData);
      const resultDta = await this.eventsService.enrollForEvent(
        this.enrollForm.value
      );



      this.spinner.hide();
      // this.toast.openSnackBar('Membership Added Successfully');
      this._matdialog.open(FreeEventSuccessComponent, {
        width: '30%',
        panelClass: 'custom-modal'
      });
      this.persons.enable();
      this.childPersons.enable();
      this.enrollForm.reset();
    } catch (error) {
      this.persons.enable();
      this.childPersons.enable();
      this.spinner.hide();
      this.toast.openSnackBar('Something went wrong. contact administrator');
    }
    // }

    //this.showPaypal = true

    //console.log(this.showPaypal)
    // if (this.user?.uid) {
    //   console.log(this.user.uid)
    //   this.enrollForm.value.uid = this.user.uid
    // }
    // this.enrollForm.value.eventDate = this.eventDetails.startDate
    // this.enrollForm.value.eventEndDate = this.eventDetails.endDate
    // this.enrollForm.value.eventPrice = this.eventDetails.price
    // this.enrollForm.value.eventLocation = this.eventDetails.location
    // this.enrollForm.value.createdAt = new Date().toLocaleDateString()
    // this.enrollForm.value.eventName = this.eventDetails.title
    // this.enrollForm.value.eventTime = this.eventDetails.time
    // this.enrollForm.value.eventImage = this.eventDetails.image
    // console.log(this.enrollForm.value)
    // const result = await this.eventsService.enrollForEvent(
    //   this.enrollForm.value
    // );
    //this.appointmentBookingForm.reset();
    // if (result) {
    //   enroll.resetForm();
    // }
  }

  getAdultsLength() {
    return this.enrollForm.value.adultPerson?.length;
  }

  getChildLength() {
    return this.enrollForm.value.childPerson?.length;
  } 


  someMethod(evData) {
    console.log(evData)
    this.quantityData = evData
    if (evData == 1) {
      this.evPrice = this.unitPrice * 1;
      console.log(this.evPrice)
    }
    if (evData == 2) {
      this.evPrice = this.unitPrice * 2;
    }
    if (evData == 3) {
      this.evPrice = this.unitPrice * 3;
      console.log(this.evPrice)
    }
    if (evData == 4) {
      this.evPrice = this.unitPrice * 4;
    }
    if (evData == 5) {
      this.evPrice = this.unitPrice * 5;
    }
    if (evData == 6) {
      this.evPrice = this.unitPrice * 6;
    }
    if (evData == 7) {
      this.evPrice = this.unitPrice * 7;
    }
    if (evData == 8) {
      this.evPrice = this.unitPrice * 8;
    }
    if (evData == 9) {
      this.evPrice = this.unitPrice * 9;
    }
    if (evData == 10) {
      this.evPrice = this.unitPrice * 10;
    }

    // let adultForm = this._fb.group({
    //   name: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    //   age: [null, [Validators.required]],
    //   foodAlergy: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    //   phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
    //   email: [null, [Validators.required, Validators.pattern(this.emailRegex)]]
    // });
    console.log(this.adultPerson);
    this.adultPerson().clear();
    // for (let i = 0; i < evData; i++) {
    //   this.adultPerson().push(adultForm);
    // }
    console.log("this.adultPerson: ", this.adultPerson);
    this.addAdult(evData);
  }


  addAdult(evData: number) {
    for( let i=0; i< evData; i++ ) {
      this.adultPerson().push(this.newAdult());
    }
  }

  newAdult(): FormGroup {
    return this._fb.group({
      name: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
      age: [null, [Validators.required, Validators.pattern('^(1[89]|[2-9][0-9])$')]],
      foodAlergy: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
      phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]]
    })
  }

  someChildMethod(evData) {
    console.log(evData)
    this.childQuantityData = evData;
    if (evData == 0) {
      this.childEvPrice = 0;
    }
    if (evData == 1) {
      this.childEvPrice = this.childUnitPrice * 1;
      console.log(this.childUnitPrice);
    }
    if (evData == 2) {
      this.childEvPrice = this.childUnitPrice * 2
    }
    if (evData == 3) {
      this.childEvPrice = this.childUnitPrice * 3
      console.log(this.childUnitPrice);
    }
    if (evData == 4) {
      this.childEvPrice = this.childUnitPrice * 4;
    }
    if (evData == 5) {
      this.childEvPrice = this.childUnitPrice * 5;
    }
    if (evData == 6) {
      this.childEvPrice = this.childUnitPrice * 6;
    }
    if (evData == 7) {
      this.childEvPrice = this.childUnitPrice * 7;
    }
    if (evData == 8) {
      this.childEvPrice = this.childUnitPrice * 8;
    }
    if (evData == 9) {
      this.childEvPrice = this.childUnitPrice * 9;
    }
    if (evData == 10) {
      this.childEvPrice = this.childUnitPrice * 10;
    }


    // let childForm = this._fb.group({
    //   name: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    //   age: [null, [Validators.required]],
    //   foodAlergy: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    // });

    // this.childPerson.clear();
    // for (let i = 0; i < evData; i++) {
    //   this.childPerson.push(childForm);
    // }


    console.log(this.childPerson);
    this.childPerson().clear();
    // for (let i = 0; i < evData; i++) {
    //   this.adultPerson().push(adultForm);
    // }
    console.log("this.childPerson: ", this.childPerson);
    this.addChild(evData);
  }

  addChild(evData: number) {
    for( let i=0; i< evData; i++ ) {
      this.childPerson().push(this.newChild());
    }
  }

  newChild(): FormGroup {
    return this._fb.group({
      name: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
      age: [null, [Validators.required, Validators.pattern('^(?:1[0-7]|0[1-9]|1|[2-9])$')]],
      foodAlergy: [null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-Z ]')]],
    })
  }

  childAgeChange() {
    let childValues = this.enrollForm.value.childPerson;
    if(childValues.length) {
      let totalChildCost = 0;
      childValues.forEach((child) => {
        if(child.age < CHILDMINAGE) {
          totalChildCost += 0;
        }else {
          totalChildCost += this.childUnitPrice;
        }
      });

      this.childEvPrice =  totalChildCost;
    }

  }


  getTotalPrice() {
    return this.evPrice + this.childEvPrice;
  }

  openErrorDialog() {
    alert('Error')
  }

  showData() {
    console.log("THe form data is: ", this.enrollForm.value);
  }

  async openSuccessDialog(data: any) {
    this.spinner.show()
    if (this.user?.uid) {
      console.log(this.user.uid)
      this.enrollForm.value.uid = this.user.uid
    }
    this.enrollForm.value.eventDate = this.eventDetails.startDate
    this.enrollForm.value.eventEndDate = this.eventDetails.endDate
    this.enrollForm.value.eventPrice = this.eventDetails.price
    this.enrollForm.value.eventId = this.eventDetails.id
    this.enrollForm.value.name = this.enrollForm.value.adultPerson[0].name
    this.enrollForm.value.disclaimerData = this.disclaimerData
    this.enrollForm.value.bookingDate = new Date()
    this.enrollForm.value.eventLocation = this.eventDetails.location
    this.enrollForm.value.createdAt = new Date().toLocaleDateString()
    this.enrollForm.value.eventName = this.eventDetails.title
    this.enrollForm.value.eventTime = this.eventDetails.time
    this.enrollForm.value.eventImage = this.eventDetails.image
    this.enrollForm.value.purchasedAmount = this.evPrice + this.childEvPrice
    this.enrollForm.value.persons =  this.totalQuantity;

    //console.log(this.enrollForm.value)
    // const result = await this.eventsService.enrollForEvent(
    //   this.enrollForm.value
    // );
    this.enrollForm.value.payload = data;
    try {

      //const resultDta = await this.membershipService.membership(this.memberShipForm.value, this.membershipData);
      const resultDta = await this.eventsService.enrollForEvent(
        this.enrollForm.value
      );



      this.spinner.hide();
      // this.toast.openSnackBar('Membership Added Successfully');
      this._matdialog.open(EventSuccessPopupComponent, {
        width: '30%',
        panelClass: 'custom-modal',
        data: data.id
      });
      this.persons.enable();
      this.childPersons.enable();
      this.enrollForm.reset();
    } catch (error) {
      this.persons.enable();
      this.childPersons.enable();
      this.spinner.hide();
      this.toast.openSnackBar('Something went wrong. contact administrator');
    }
  }


  // checkValidity(){

  // }

  // updateName(ev: any, fg: AbstractControl): void {
  //   (fg.get('name') as AbstractControl).setValue(ev.value);
  // //   (fg.get('searchValue') as AbstractControl).setValue(
  // //     this.inputTypeObj[ev.value.inputType][0].operator
  // //   );
  // //   (fg.get('searchValue') as AbstractControl).setValue(null);
  // //   this.resetPagination();
  // //   this.filterSubject.next(this.filterForm.value);
  // }

}
