import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,NgForm, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ToastService } from 'src/app/services/toast.service';
import { ViewportScroller } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;
  banners:any;


  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );


  constructor( private _fb: FormBuilder, private spinner: NgxSpinnerService, private toast: ToastService,private contactService:ContactService,private vps: ViewportScroller) { }

  ngOnInit(): void {

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);

    // setTimeout(() => {
    //   window.scroll(0,610);
    // }, 500);

    this.contactService.getContactBanners().subscribe(data=>{

      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });

      console.log(this.banners)

    })

    this.contactForm = this._fb.group({
      name: [null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      phone: [null, [Validators.required, Validators.pattern(this.phoneRegex)]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      subject: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });

  }

  get name(): AbstractControl {
    return this.contactForm.get('name');
  }
  get phone(): AbstractControl {
    return this.contactForm.get('phone');
  }
  get email(): AbstractControl {
    return this.contactForm.get('email');
  }
  get subject(): AbstractControl {
    return this.contactForm.get('subject');
  }

  get message(): AbstractControl {
    return this.contactForm.get('message');
  }



 async contactData(contactFormData:NgForm){

    if (this.contactForm.invalid) {
      this.toast.openSnackBar('Enter Valid Form');
      this.contactForm.markAllAsTouched();
      return;
    }

    const contactFormDetails = this.contactForm.value;

    await this.contactService.saveEnquiry(contactFormDetails);
    contactFormData.resetForm()

  }

}
