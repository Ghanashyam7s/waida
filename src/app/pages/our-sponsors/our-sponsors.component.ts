import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SponsorsImagesComponent } from 'src/app/components/sponsors-images/sponsors-images.component';
import { SponsorsService } from 'src/app/services/sponsors.service';
import { NgxSpinnerService } from "ngx-spinner";
import { SponsorRegisterComponent } from '../sponsor-register/sponsor-register.component';
declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-our-sponsors',
  templateUrl: './our-sponsors.component.html',
  styleUrls: ['./our-sponsors.component.scss']
})
export class OurSponsorsComponent implements OnInit {
  premiumSponsors: any;
  normalSponsors: any;
  banners: any;
  constructor(private sponsorsService: SponsorsService, private _matdailog: MatDialog,private spinner: NgxSpinnerService) { }
  ngOnInit(): void {

    this.spinner.show();


    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
    // setTimeout(() => {
    //   window.scroll(0,610);
    // }, 500);

    this.sponsorsService.getSponsorsBanners().subscribe(data => {
      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });
      console.log(this.banners)
    })
    this.sponsorsService.getPremiumSponsors().subscribe(data => {
      this.premiumSponsors = data.sort(function (a, b) {
        return a.position - b.position;
      });
      console.log(this.premiumSponsors)
    });
    this.sponsorsService.getNormalSponsors().subscribe(data => {
      this.normalSponsors = data.sort(function (a, b) {
        return a.position - b.position;
      });
      console.log(this.normalSponsors)
    })
  }

  sponsorImages(clickedSponsorImage){

    this._matdailog.open(SponsorsImagesComponent, {
      width: '50%',
      panelClass: ['custom-modal', 'member-detail-modal'],
      data:clickedSponsorImage
    });

  }

  sponsorRegister(){
    this._matdailog.open(SponsorRegisterComponent, {
      width: '40%',
      panelClass: 'custom-modal'
    });
  }


  downloadPdf( ) {
    const pdfUrl = './assets/WAIDA sponsorship new-converted.pdf';
    const pdfName = 'Waida Sponsorship Agreement';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

}
