import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { MembershipService } from 'src/app/services/membership.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {
  user:any;
  myEvents:any
  evDate:any;
  activeEventsCounttwo:any;
  show2:boolean = false;
  //hideDateActive:boolean = true
 // hideDateOld:boolean = true

  activeEventsCount:any;
  show:boolean = false;
  activeEvents = []
  oldEvents = []

  constructor(private eventsService:EventsService, private spinner: NgxSpinnerService, private membershipService: MembershipService) { }

  ngOnInit(): void {

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);

    this.membershipService.getUserState()
    .subscribe(user => {
      this.user = user;
      console.log(this.user.uid)

      this.eventsService.getMyAllEvents(this.user.uid).subscribe(data=>{

        this.myEvents = data
        console.log(this.myEvents)
        this.activeEvents = []
        this.oldEvents = []
        for(let event of this.myEvents){

          console.log(event)
          this.evDate = event.eventDate.toDate().getTime()
          console.log(this.evDate)
          console.log(new Date().getTime())



          if(this.evDate >= new Date().getTime()){
            console.log("lll")



            this.activeEvents.push(event)
            console.log(this.activeEvents)

            for(let act of this.activeEvents){

              if(act.eventDate.toDate().toLocaleDateString() === act.eventEndDate.toDate().toLocaleDateString()){

             //   this. hideDateActive = false

                act.hide = true

                console.log(act)

              }

            }

          }

          if(this.evDate <= new Date().getTime()){
            console.log("lll")



            this.oldEvents.push(event)
            console.log(this.oldEvents)

            for(let old of this.oldEvents){

              if(old.eventDate.toDate().toLocaleDateString() === old.eventEndDate.toDate().toLocaleDateString()){

               // this. hideDateOld = false
                old.hide = false

              }

            }

          }





        }

        this.activeEventsCount = this.activeEvents.length
        console.log(this.activeEventsCount)
        this.show = false
        if(this.activeEventsCount === 0){
          this.show = true
        }

        this.activeEventsCounttwo = this.oldEvents.length
        console.log(this.activeEventsCounttwo)
        this.show2 = false
        if(this.activeEventsCount === 0){
          this.show2 = true
        }

        // var mydate = new Date('2014-04-03');
        // console.log(mydate.toDateString());

      })

      // if(user){
      //   this.dialogRef.close();
      // }
    })

  }

}
