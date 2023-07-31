import { Component, OnInit } from '@angular/core';
import { MembershipService } from 'src/app/services/membership.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-listing',
  templateUrl: './profile-listing.component.html',
  styleUrls: ['./profile-listing.component.scss']
})
export class ProfileListingComponent implements OnInit {

  user:any;
  currentMember:any;
  sponsor:any;
  constructor(private membershipService: MembershipService,private profileService:ProfileService) { }

  ngOnInit(): void {



    ///console.log();

    this.membershipService.getUserState()
    .subscribe(user => {
      this.user = user;
      console.log(this.user)



        this.profileService.getCurrentUserData(this.user.uid).subscribe(data=>{

          console.log(data)

          this.currentMember = data

        })



    });
  }

}
