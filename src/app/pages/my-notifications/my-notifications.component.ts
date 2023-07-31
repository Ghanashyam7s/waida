import { Component, OnInit } from '@angular/core';
import { MembershipService } from 'src/app/services/membership.service';
import { ProfileService } from 'src/app/services/profile.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.scss']
})
export class MyNotificationsComponent implements OnInit {
  user:any;
  notification = [];
 // show:boolean = false;
 // hideDate:boolean = true
  notificationCountCount:any;
  constructor(private membershipService: MembershipService,private spinner: NgxSpinnerService, private profileService:ProfileService) { }

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

      this.profileService.getMyNotifications(this.user.uid).subscribe(data=>{
        console.log(data)

        this.notification = data

        for(let not of this.notification){

          if(not.eventDate.toDate().toLocaleDateString() === not.eventEndDate.toDate().toLocaleDateString()){

           // this. hideDate = false

            not.hide = true

          }

        }





        this.notificationCountCount = this.notification.length
        console.log(this.notificationCountCount)
       // this.show = false
        if(this.notificationCountCount === 0){
       //   this.show = true
        }

      })


    });

  }

}
