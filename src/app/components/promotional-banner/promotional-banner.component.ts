import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-promotional-banner',
  templateUrl: './promotional-banner.component.html',
  styleUrls: ['./promotional-banner.component.scss']
})
export class PromotionalBannerComponent implements OnInit {
  public promotionalConfig: SwiperConfigInterface = {};
  constructor(
    private dialogRef: MatDialogRef<PromotionalBannerComponent>,
  ) { }

  ngOnInit(): void {
  }
  dialogClose(result?: any) {
    this.dialogRef.close(result ? result : null);
  }
  ngAfterViewInit() {
    this.promotionalConfig = {
      direction: 'horizontal',
      slidesPerView: 1,
      speed: 2000,
      observer: true,
      observeParents: true,
      longSwipes: false,
      freeMode: true,
      navigation: {
        nextEl: '.banner-button-next',
        prevEl: '.banner-button-prev',
      },
      autoplay: {
        delay: 2000,
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
  }
}
