import { MemberDetailsComponent } from './../../components/member-details/member-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { OurMembershipComponent } from '../our-membership/our-membership.component';
import { MembersService } from 'src/app/services/members.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-our-members',
  templateUrl: './our-members.component.html',
  styleUrls: ['./our-members.component.scss']
})
export class OurMembersComponent implements OnInit {

  members:any;
  banners:any;

  constructor(
    private _matdailog: MatDialog, private membersService:MembersService,private spinner: NgxSpinnerService
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


    this.membersService.getMembersBanners().subscribe(data=>{

      this.banners = data.sort(function (a, b) {
        return a.position - b.position;
      });

      console.log(this.banners)

    })

    this.membersService.getMembers().subscribe(data=>{

      this.members = data.sort(function (a, b) {
        return a.position - b.position;
      });

      console.log(this.members)

    });

  }
//   memberDetails(member:any) {
//     this._matdailog.open(MemberDetailsComponent, {
//       width: '50%',
//       panelClass: ['custom-modal', 'member-detail-modal'],
//       data:member
//     });
// }
}
