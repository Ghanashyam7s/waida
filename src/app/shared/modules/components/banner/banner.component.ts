import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() banners: any[];
  sound:boolean = false;
  noSound:boolean = true;
  public bannerConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    speed: 4000,
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
    lazy: false,
    preloadImages: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  constructor(
    private vps: ViewportScroller,
    private elRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit(): void {

    // console.log(this.banners)

    setTimeout(() => {
      this.vps.scrollToAnchor("scrollPage");
    }, 600);


  }


  slideChanged(ev: Swiper){
    //console.log(banner)
  //  console.log(ev.activeIndex, ev.previousIndex);
    /*if(ev.activeIndex == 2){
      ev.autoplay.start();
    }
    if(ev.previousIndex == 2){
      ev.autoplay.stop()
    }*/
    const previousBanner = this.banners.find((single: any, index: number) => index === ev.previousIndex - 1);
    const activeBanner = this.banners.find((single: any, index: number) => index === ev.activeIndex - 1);
  //  console.log("Previous");
  //  console.log(previousBanner);
 //   console.log("Active");
   // console.log(activeBanner);
    if(previousBanner){
      if(previousBanner.bannerType === 'VIDEO'){
        const videoTag = this.elRef.nativeElement.querySelector('#bannerVideo'+ (ev.previousIndex -1));
      //  console.log(videoTag);
        videoTag.pause();
      }
    }

    if(activeBanner){
      if(activeBanner.bannerType === 'VIDEO'){
        const videoTag: HTMLVideoElement = this.elRef.nativeElement.querySelector('#bannerVideo'+ (ev.activeIndex - 1));
        videoTag.muted = true;
     //   console.log(videoTag);
        videoTag.play();
      }
    }


  }

  muteAndUnmute(id: string, value: boolean){
    const videoTag: HTMLVideoElement = this.elRef.nativeElement.querySelector('#'+id);
    videoTag.muted = value;
    this.sound = !this.sound
    this.noSound = !this.noSound
  }

  mute(ev: Swiper){

  //  console.log()
  //  console.log()


    const videoTagMute = this.elRef.nativeElement.querySelector('#bannerVideo'+ (ev.previousIndex -1));
      //  console.log(videoTagMute);
        videoTagMute.pause();

  }

  unMute(){

  }

}
