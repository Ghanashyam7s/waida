import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewsLetterSubscriptionService } from 'src/app/services/news-letter-subscription.service';
import { FormBuilder,AbstractControl,Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subcription: FormGroup;
  settings:any;

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  constructor(private newsLetterSubscriptionService:NewsLetterSubscriptionService, private _fb: FormBuilder,private toast: ToastService,private commonService:CommonService) { }

  ngOnInit(): void {

    this.subcription = this._fb.group({

      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
    });


    this.commonService.getGeneralSettings().subscribe(data=>{
      console.log(data)
      this.settings = data
    })

  }

  get email(): AbstractControl {
    return this.subcription.get('email');
  }

 async subcriptions() {

    if(this.subcription.invalid){
      this.toast.openSnackBar('Enter Valid Email');
      this.subcription.markAllAsTouched();
      return;
      }

      console.log(this.subcription.value)
      this.subcription.value.status="SUBSCRIBED"
      this.subcription.value.createdAt=new Date()
     await this.newsLetterSubscriptionService.subcription(this.subcription.value)

     this.subcription.reset()

  }
}
