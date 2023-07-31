import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-events-gallery',
  templateUrl: './events-gallery.component.html',
  styleUrls: ['./events-gallery.component.scss']
})
export class EventsGalleryComponent implements OnInit {
  selectedDate: any;
  events:any;
  upCommingWaida = []
  selectedEvents = [];
  selectedEventsCount:any;
  show:boolean = true;
  todayDate:any;
  hideComingSoon:boolean = true
  allEventsData:any;
  pastEvents = [];
  noData:boolean = true
  banners:any;
  allEvents:any;
  upCommingWaidaEvents = []
  upCommingNonWaidaEvents = []

  eventDate:any;
  waidaEvents:any;
  nonWaidaEvents:any;

  emailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  phoneRegex = new RegExp(/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/);

  constructor(private eventsService : EventsService,private vps: ViewportScroller, private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {

    // setTimeout(() => {
    //   window.scroll(0,610);
    // }, 500);
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);


    this.eventsService.getEventsBanners().subscribe(data=>{

      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });

      console.log(this.banners)

    })

    this.eventsService.getWaidaEvents().subscribe(data=>{

      console.log(data)


      this.waidaEvents = data;

      this.upCommingWaidaEvents = []

      for(let singleEvent of this.waidaEvents){


        console.log(singleEvent.endDate.toDate().toLocaleDateString())
        console.log(new Date().toLocaleDateString())


        if(singleEvent.endDate.toDate().toLocaleDateString() === new Date().toLocaleDateString()){
         // this.hideComingSoon = false
          singleEvent.hideComingSoon = false

        }else{
          singleEvent.hideComingSoon = true
        }

       

        if(new Date().getTime() - 86400000 < (singleEvent.endDate.toDate().getTime() + 86400000)){

          this.upCommingWaidaEvents.push(singleEvent)

         // this.noData = false

        //  this.upCommingWaidaEvents = this.upCommingWaida.sort(function (a, b) {
        //   return a.startDate.toDate().getTime() - b.startDate.toDate().getTime();
        // });

          console.log(this.upCommingWaidaEvents)

        }

      }



    });

    this.eventsService.getNonWaidaEvents().subscribe(data=>{

      this.nonWaidaEvents = data;

      this.upCommingNonWaidaEvents = []

      for(let singleNonWaidaEvent of this.nonWaidaEvents){

        if(new Date().getTime() - 86400000 < (singleNonWaidaEvent.endDate.toDate().getTime() + 86400000)){
          

          this.upCommingNonWaidaEvents.push(singleNonWaidaEvent)

         // this.noData = false

          console.log(this.upCommingNonWaidaEvents)

        }

      }

    })


  }



  getPastEvents(){

    this.eventsService.getEvents().subscribe(data=>{
      console.log(data)
      this.allEventsData = data
      this.pastEvents = []
      for(let single of this.allEventsData){

        if(new Date().getTime() > single.endDate.toDate().getTime()){

          this.pastEvents.push(single)

          this.noData = false

          console.log(this.pastEvents)

        }

      }
    })

  }


  commingEvents(){

    setTimeout(() => {
      this.vps.scrollToAnchor("upcommingEvents");
    }, 100);

  }


}
