import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  isBlogSticky = false;
  newsDetails:any;
  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    console.log('ayu anna');
    console.log(window.pageYOffset >= 200);
    this.isBlogSticky =  (window.pageYOffset >= 200) ? true : false;
  }
  constructor(
    private vps: ViewportScroller,
    private router: Router,
    private activeRoute : ActivatedRoute,
    private newsService:NewsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);

    this.activeRoute.params.subscribe((params)=>{

      this.newsService.getNewsDetails(params.id).subscribe(data=>{
        console.log(data)
        this.newsDetails=data
      })

    })
  }
  scrollOne() {

    this.vps.scrollToAnchor('scrollOne');
    this.router.navigate(['/index']).then((data) => {
      if (data) {
        setTimeout(() => {
          this.vps.scrollToAnchor('scrollOne');
        }, 1000);
      }
    });
  }
}
