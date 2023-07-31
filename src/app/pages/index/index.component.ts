import { Component, HostListener, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { EventsService } from 'src/app/services/events.service';
import { HomeService } from 'src/app/services/home.service';
import { NewsService } from 'src/app/services/news.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swiper from 'swiper';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  selectedDate: any;
  allEvents: any;
  banners: any;
  divide:any
  eventDateCallender:any;
  testimonials: any;
  eventDate: any;
  sponsors: any;
  councilMembers: any;
  selectedEvents = [];
  aboutUs:any;
  show = false;
  selectedEventsCount: any;
  news: any;
  datas = []
  newsToDayDate: any;
  //datesToHighlight = ["2019-01-22T18:30:00.000Z", "2019-01-22T18:30:00.000Z", "2019-01-24T18:30:00.000Z", "2019-01-28T18:30:00.000Z", "2019-01-24T18:30:00.000Z", "2019-01-23T18:30:00.000Z", "2019-01-22T18:30:00.000Z", "2019-01-25T18:30:00.000Z"];
  todayDate: any;

  datesToHighlight = [];
  rotation = 'rotate(20deg)';
  public memberConfig: SwiperConfigInterface = {
  };
  public bannerConfig: SwiperConfigInterface = {};
  public clientConfig: SwiperConfigInterface = {};
  public testConfig: SwiperConfigInterface = {};
  public aboutConfig: SwiperConfigInterface = {};
  // @HostListener('window:scroll', ['$event'])
  // scrollHandler(event: any) {
  //   this.rotation = `rotate(${window.scrollY}deg)`;
  // }


  // dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  //   // Only highligh dates inside the month view.
  //   if (view === 'month') {
  //     const date = cellDate.getDate();

  //     // Highlight the 1st and 20th day of each month.
  //     return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  //   }

  //   return '';
  // }

 // public date: Object = new Date('1/7/2017');
  constructor(
    private homeService: HomeService,
    private newsService: NewsService,
    private datePipeServive: DatePipe,
    private spinner: NgxSpinnerService,
    private eventsService: EventsService) { }
  ngOnInit(): void {

    this.homeService.getAboutUs().subscribe(data=>{
      console.log(data)
      this.aboutUs = data
    })


   // this.datas = ["2019-01-22", "2019-01-24", "2021-02-22"];

    this.newsToDayDate = new Date()
   this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
    this.todayDate = new Date().toLocaleDateString()
    // // console.log(this.todayDate)
    this.eventsService.getEventsByDate().subscribe(data => {
      this.allEvents = data
      // console.log(this.selectedEvents)
      this.todayDate = new Date().toLocaleDateString()
      this.selectedEvents = []
      for (let event of this.allEvents) {
        this.eventDate = event.startDate.toDate().toLocaleDateString()
       // this.eventDateCallender = event.startDate.toDate().toISOString();

        this.eventDateCallender  = this.datePipeServive.transform( event.startDate.toDate(),"yyyy-MM-dd");

        console.log( this.eventDateCallender)



        this.datas.push(this.eventDateCallender)
        // console.log(this.todayDate)
        // console.log(this.eventDate)
        if (this.todayDate === this.eventDate) {
          // console.log(this.todayDate)
          // console.log(this.eventDate)
          this.selectedEvents.push(event)
        }
      }
      this.selectedEventsCount = this.selectedEvents.length
      // console.log(this.selectedEventsCount)
      this.show = false
      if (this.selectedEventsCount === 0) {
        this.show = true
      }
    });
    this.homeService.getHomeBanners().subscribe(data => {
      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });
      // console.log(this.banners)
    });
    this.homeService.getTestimonials().subscribe(data => {
      this.testimonials = data.sort(function (a, b) {



        return a.position - b.position;
      });


      for(let cut of this.testimonials ){
        this.divide = cut.name.split(" ")

        if(this.divide.length == 1){
       //  console.log(this.divide)
         cut.name2 = this.divide[0].slice(0,1)
       //  console.log(cut.name2)
       //  console.log(this.allComments)
        }
        if(this.divide.length > 1){

        // console.log(this.divide)
         const first = this.divide[0].slice(0,1)
         const second = this.divide[1].slice(0,1)
         cut.name2 = first.concat(second)
         // for(let data2 of this.divide){

         //   console.log(data2)
         //   const y = data2.slice(0,1)
         //   console.log(y)
         //   cut.name2 = y.


         // }

       }
   }

       console.log(this.testimonials)
    });
    this.homeService.getSponsors().subscribe(data => {
      this.sponsors = data.sort(function (a, b) {
        return a.position - b.position;
      });
      // console.log(this.sponsors)
    });
    this.homeService.getCouncilMembers().subscribe(data => {
      this.councilMembers = data.sort(function (a, b) {
        return a.position - b.position;
      });
      // console.log(this.councilMembers)
    });
    this.newsService.getNews().subscribe(data => {
      this.news = data;
      // console.log(this.news)
    });
  }
  ngAfterViewInit() {
    this.bannerConfig = {

      direction: 'horizontal',
      slidesPerView: 1,
      speed: 4000,
      observer: true,
      observeParents: true,
      longSwipes: false,
      freeMode: false,
      navigation: {
        nextEl: '.banner-button-next',
        prevEl: '.banner-button-prev',
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      loop: true,
      lazy: true,
      preloadImages: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    };
    this.clientConfig = {
      direction: 'horizontal',
      slidesPerView: 4,
      speed: 4000,
      observer: true,
      observeParents: true,
      longSwipes: false,
      freeMode: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      loop: true,
      lazy: true,
      preloadImages: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        240: {
          slidesPerView: 2,
        },
        600: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    };
    this.testConfig = {
      direction: 'horizontal',
      slidesPerView: 3,
      speed: 2000,
      autoplay: {
        delay: 9000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      keyboard: true,
      loop: true,
      longSwipes: true,
      centeredSlides: true,
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: false,
      // autoplay: true,
      spaceBetween: 25,
      navigation: {
        nextEl: '.team-button-next',
        prevEl: '.team-button-prev',
      },
      breakpoints: {
        240: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    };
    this.aboutConfig = {
      direction: 'horizontal',
      slidesPerView: 1,
      speed: 1000,
      longSwipes: false,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      keyboard: false,
      mousewheel: true,
      scrollbar: false,
      navigation: false,
      pagination: false,
      nested: false,

    };

    this.memberConfig = {
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
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: false,
      pagination: false,
      navigation: {
        nextEl: '.member-button-prev',
        prevEl: '.member-button-next',
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
  onIndexChange() {
  }
  onSelect(event) {
    this.selectedDate = event.toLocaleDateString();
    this.eventsService.getEventsByDate().subscribe(data => {
      this.allEvents = data
      // // console.log(this.selectedEvents)
      this.todayDate = new Date().toLocaleDateString()
      this.selectedEvents = []
      for (let event of this.allEvents) {
        this.eventDate = event.startDate.toDate().toLocaleDateString()
        // console.log(this.todayDate)
        // console.log(this.eventDate)
        if (this.selectedDate === this.eventDate) {
          // console.log(this.todayDate)
          // console.log(this.eventDate)
          this.selectedEvents.push(event)
        }
      }
      this.selectedEventsCount = this.selectedEvents.length
      // // console.log(this.selectedEventsCount)
      this.show = false
      if (this.selectedEventsCount === 0) {
        this.show = true
      }
    })
    // // console.log(this.selectedDate)
    // // console.log(this.events)
    // for(let event of this.events){
    //   this.selectedEvents = []
    //  // // console.log(data.startDate.toDate().toLocaleDateString())
    //   if(this.selectedDate === event.startDate.toDate().toLocaleDateString()){
    //     this.selectedEvents.push(event);
    //     // console.log(this.selectedEvents)
    //   }
    // }
  }
  slideChanged(ev: Swiper){
   // console.log(ev.previousIndex, ev.activeIndex);
    const degree = 90 * ev.activeIndex;
    this.rotation = `rotate(${degree}deg)`;
  }




  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datas.map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'special-date' : '';
    };
  }


// dateClass() {


//   //setTimeout(() => {

//     return (date: Date): MatCalendarCellCssClasses => {
//       const highlightDate = this.datesToHighlight
//         .map(strDate => new Date(strDate))
//         .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

//       return highlightDate ? 'special-date' : '';
//     };

//  // }, 300);


// }



}
