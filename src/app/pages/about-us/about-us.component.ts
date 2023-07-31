import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AboutUsService } from 'src/app/services/about-us.service';
import { ViewportScroller } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from 'src/app/services/home.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  status = false;
  clickEvent() {
    this.status = !this.status;
  }
  councilMembers: any;
  aboutUs:any;
  banners: any;
  public memberConfig: SwiperConfigInterface = {};
  constructor(
    private aboutUsService: AboutUsService,
    private vps: ViewportScroller,
    private spinner: NgxSpinnerService,
    private homeService:HomeService
  ) { }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
    // setTimeout(() => {
    //   window.scroll(0,610);
    // }, 500);
    this.aboutUsService.getAboutUsBanners().subscribe((data) => {
      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });
      console.log(this.banners);
    });

    this.homeService.getAboutUs().subscribe(data=>{
      console.log(data)
      this.aboutUs = data
    })


    this.aboutUsService.getCouncilMembers().subscribe((data) => {
      this.councilMembers = data.sort(function (a, b) {
        return a.position - b.position;
      });
      console.log(this.councilMembers);
    });
  }
  ngAfterViewInit() {
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
}
