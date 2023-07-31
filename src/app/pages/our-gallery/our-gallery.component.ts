import { GalleryComponent } from './../../components/gallery/gallery.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GalleryService } from 'src/app/services/gallery.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-our-gallery',
  templateUrl: './our-gallery.component.html',
  styleUrls: ['./our-gallery.component.scss']
})
export class OurGalleryComponent implements OnInit {

  gallery:any;
  banners:any;

  constructor(
    private _dialog: MatDialog, private galleryService:GalleryService,private spinner: NgxSpinnerService
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

    this.galleryService.getGalleryBanners().subscribe(data=>{

      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });

      console.log(this.banners)

    })

    this.galleryService.getGallery().subscribe(data=>{

      this.gallery = data.sort(function (a, b) {
        return a.position - b.position;
      });

      console.log(this.gallery)

    });

  }
  galleryView(galleryImages) {
    this._dialog.open ( GalleryComponent, {
      width: '40%',
      panelClass: 'custom-modal',
      data:galleryImages
    })
  }
}
