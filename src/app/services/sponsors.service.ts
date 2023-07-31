import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class SponsorsService {

  newUser: any;


  constructor(private afs: AngularFirestore, private toast: ToastService, public afAuth: AngularFireAuth) { }


  getSponsorsBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'sponsors')).valueChanges();
  }

  getPremiumSponsors(): Observable<any> {
    return this.afs.collection<any>('ourSponsors', ref => ref.where('type', '==', 'premium')).valueChanges();
  }

  getNormalSponsors(): Observable<any> {
    return this.afs.collection<any>('ourSponsors', ref => ref.where('type', '==', 'normal')).valueChanges();
  }

  async sponsorship(sponsorDetails: any): Promise<boolean> {


    try {

      sponsorDetails.id = this.afs.createId()
      await this.afs.doc(`ourSponsorMembers/${sponsorDetails.id}`).set(sponsorDetails, { merge: true });
     // this.toast.openSnackBar('You Submitted Successfully');
      return true;

      // await  this.afAuth.createUserWithEmailAndPassword( user.email, user.password)
      // .then( userCredential => {
      //   this.newUser = user;
      //   console.log(userCredential);
      //   userCredential.user.updateProfile( {
      //     displayName: user.fName,
      //     photoURL: user.profileUrl

      //   });

      //   this.insertSponsorData(userCredential);

      // }

      // )

      // //await  (await this.afAuth.currentUser).setUserProperties({dccc:'sss'})
      // //await  this.afAuth.tenantId.setUserProperties({favorite_food: 'apples'});


    } catch (err) {
      console.log(err);
      this.toast.openSnackBar('Something went wrong please try again after some time');
      return false;
    }



    // await  this.afAuth.createUserWithEmailAndPassword( user.email, user.password)
    //   .then( userCredential => {
    //     this.newUser = user;
    //     console.log(userCredential);
    //     userCredential.user.updateProfile( {
    //       displayName: user.fName,
    //       photoURL: user.profileUrl
    //     });

    //     this.toast.openSnackBar(
    //       'Your Membership Added Successfully'
    //     );

    //     this.router.navigate(['/our-members'])

    //     this.insertUserData(userCredential);
    //     this.insertMemberSubscription(userCredential,membershipData);

    //   }

    //   )

    //   console.log("oooooooooooo")

    //   return true;



    }



    // insertSponsorData(userCredential) {
    //   return this.afs.doc(`ourSponsorMembers/${userCredential.user.uid}`).set({
    //     email: this.newUser.email,
    //     firstname: this.newUser.fName,
    //     lastname: this.newUser.lName,
    //     password:this.newUser.password,
    //     phone:this.newUser.phone,
    //     address:this.newUser.address,
    //     image:this.newUser.profileUrl,
    //     isSponsor:true,
    //     id:userCredential.user.uid

    //   })
    // }


}
