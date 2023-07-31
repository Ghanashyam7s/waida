import { PromotionalBannerComponent } from './../promotional-banner/promotional-banner.component';
import { LoginComponent } from './../../pages/login/login.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MembershipService } from 'src/app/services/membership.service';
import { Route, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  isSticky = false;
  isScrollTop = false;
  currentMember:any;
  public appointmentForm: FormGroup;
  xpandStatus = false;
  settings:any;
  // MOBILE-MENU
  customNavCollapsedHeight = '50px';
  customNavExpandedHeight = '50px';
  listNone = false;
  @HostListener('window:scroll', [])
  checkScroll(): void {
    this.isSticky = window.pageYOffset >= 200;
    this.isScrollTop = window.pageYOffset >= 200;
  }
  constructor(
    private _fb: FormBuilder,
    private membershipService: MembershipService,
    private _matdialog: MatDialog,
    private router: Router,
    private profileService:ProfileService,
    private commonService:CommonService
    //private dialogRef: MatDialogRef<LoginComponent>,
  ) { }
  ngOnInit(): void {
    this.membershipService.getUserState()
      .subscribe(user => {
        this.user = user;
        console.log(this.user)



        setTimeout(() => {

          console.log(this.user)

          this.profileService.getCurrentUserData(this.user.uid).subscribe(data=>{

            console.log(data)

            this.currentMember = data

          })

      }, 1500);


        // if(user){
        //   this.dialogRef.close();
        // }
      })

      this.commonService.getGeneralSettings().subscribe(data=>{
        console.log(data)
        this.settings = data
      })





  }
  scrollTop(): void {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 10) {
        window.scrollTo(0, 0);
      }
    })();
  }
  login() {
    this._matdialog.open(LoginComponent, {
      width: '40%',
      panelClass: 'custom-modal'
    });
  }
  logout() {
    this.membershipService.logout();
    this.router.navigate(['/'])
  }
}
