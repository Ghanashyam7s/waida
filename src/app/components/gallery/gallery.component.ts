import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  // TESTIMONIAL-CONFIG
  public galleryConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    speed: 2000,
    autoplay: {
      delay: 9000,
      disableOnInteraction: false,
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
    pagination: {
      el: '.test-pagination',
      clickable: true,
    },
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.galley-button-next',
      prevEl: '.galley-button-prev',
    },
  };
  constructor(
    private dialogRef: MatDialogRef<GalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }
  dialogClose(result?: any) {
    this.dialogRef.close(result ? result : null);
  }
}
