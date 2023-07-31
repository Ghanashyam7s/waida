import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app' 
import { keyWordsClass } from '../shared/common-functions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailSentComponent } from '../pages/email-sent/email-sent.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';

@Injectable()
export class MembershipService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  constructor(private _matdialog: MatDialog,private afs: AngularFirestore, private toast: ToastService, private router:Router , public afAuth: AngularFireAuth,) { }

  getUserState() {
    console.log(this.afAuth.authState)
    return this.afAuth.authState;

  }

  async membership(user: any, membershipData): Promise<boolean> {
    try {
      const userCredential = await  this.afAuth.createUserWithEmailAndPassword( user.email, user.password);
      await userCredential.user.updateProfile( {
        displayName: user.firstName,
        photoURL: user.profileUrl
      });
      await this.insertUserData(user, userCredential);
      await this.insertMemberSubscription(userCredential,membershipData);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }

    }


      insertUserData(newUser, userCredential) {
        return this.afs.doc(`ourMembers/${userCredential.user.uid}`).set({
          email: newUser.email,
          firstname: newUser.firstName,
          lastname: newUser.lastName,
          role:newUser.speciality,
          password:newUser.password,
          phone:newUser.phone,
          membershipType:newUser.membershipType,
          membershipPlan:newUser.membershipPlan,
          //address:newUser.address,
          image:newUser.profileUrl,
         // type:newUser.membership,
          status:"PENDING",
          id:userCredential.user.uid,
          addressLineOne:newUser.addressLineOne,
          addressLineTwo:newUser.addressLineTwo,
          postalCode:newUser.postalCode

          // keywords : keyWordsClass.getAllCombinations(newUser.firstName)
        })
      }



      insertMemberSubscription(userCredential,membershipData) {
        console.log(membershipData)

        return this.afs.doc(`membershipSubscriptions/${userCredential.user.uid}`).set({
          planAmount: membershipData.amount,
          endsAt: membershipData.endsAt,
          purchasedAt:membershipData.purchasedAt,
          userId:userCredential.user.uid,
          days:membershipData.days,
          email:membershipData.email,
          payload:membershipData.payload,
          name:membershipData.name,
          // keywords : keyWordsClass.getAllCombinations(membershipData.name)


         // endsAt: membershipData.endsAt,


          //  firstname: this.newUser.fName,
          //  lastname: this.newUser.lName,

          // email: this.newUser.email,
          // firstname: this.newUser.fName,
          // lastname: this.newUser.lName,
          // role:this.newUser.speciality,
          // password:this.newUser.password,
          // phone:this.newUser.phone,
          // membershipType:this.newUser.membershipType,
          // membershipPlan:this.newUser.membershipPlan,
          // address:this.newUser.address,
          // image:this.newUser.profileUrl,
          // type:this.newUser.membership


        })
      }





      login( email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password)




          /*.catch(error => {
            //this.eventAuthError.next(error);
          })
          .then(userCredential => {
            if(userCredential) {
              this.toast.openSnackBar(
                ' You Logged In Successfully'
              );
              //this.router.navigate(['/home']);
            }

            if(!userCredential) {
              this.toast.openSnackBar(
                'Invalid User Credentials'
              );
              //this.router.navigate(['/home']);
            }

          })*/
      }

      logout() {
        console.log("pppppp")
        return this.afAuth.signOut();
      }

/* ---------------------------- Check Login Exist --------------------------- */

      checkLoginExist(email: string): Promise<string[]> {
        return this.afAuth.fetchSignInMethodsForEmail(email)
      }



    // SignUp(email, password) {
    //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    //     .then((result) => {
    //       /* Call the SendVerificaitonMail() function when new user sign
    //       up and returns promise */
    //       this.SendVerificationMail();
    //       this.SetUserData(result.user);
    //     }).catch((error) => {
    //       window.alert(error.message)
    //     })
    // }

   // this.afAuth.auth
    // try {
    //   mambershipData.id = this.afs.createId()
    //   await this.afs.doc(`ourMembers/${mambershipData.id}`).set(mambershipData);
    //   this.toast.openSnackBar('Your Membership Added Successfully');
    //   return true;
    // } catch (err) {
    //   console.log(err);
    //   this.toast.openSnackBar('You Failed To Register as a Member');
    //   return false;
    // }






  // createUser(user) {
  //   console.log(user);
  //   this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
  //     .then( userCredential => {
  //       this.newUser = user;
  //       console.log(userCredential);
  //       userCredential.user.updateProfile( {
  //         displayName: user.firstName + ' ' + user.lastName
  //       });

  //       this.insertUserData(userCredential)
  //         .then(() => {
  //           this.router.navigate(['/home']);
  //         });
  //     })
  //     .catch( error => {
  //       this.eventAuthError.next(error);
  //     });
  // }

  // insertUserData(userCredential: firebase.auth.UserCredential) {
  //   return this.db.doc(`Users/${userCredential.user.uid}`).set({
  //     email: this.newUser.email,
  //     firstname: this.newUser.firstName,
  //     lastname: this.newUser.lastName,
  //     role: 'network user'
  //   })
  // }

  getExistingUserDetails(email){

    return this.afs.collection<any>('membershipSubscriptions', ref => ref.where('email', '==', email)).valueChanges();

  }



  getMyMembershipSubscriptions(uid){

      return this.afs.collection<any>('membershipSubscriptions', ref => ref.where('userId', '==', uid)).valueChanges();

  }

  getMembershipBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'membership')).valueChanges();
  }



  async nonMember(nonMemberData: any): Promise<boolean> {

    try {
      nonMemberData.id = this.afs.createId()
      await this.afs.doc(`nonMembers/${nonMemberData.id}`).set(nonMemberData, { merge: true });
      this.toast.openSnackBar('Submitted Successfully');

      return true;
    } catch (err) {
      console.log(err);
      this.toast.openSnackBar('Submition Failed');
      return false;
    }
  }


  // forgotPassword(email:any){

  //   return this.afAuth.auth.sendPasswordResetEmail(
  //     email

  // }

  async forgotPassword(email: string): Promise<any> {




    try {
      await this.afAuth.sendPasswordResetEmail(email)
      return true;
    } catch (err) {
      console.log(err);
      this.toast.openSnackBar(
        'This email is not registered in WAIDA'
      );
      return false;
    }






    // try{

    // }catch{
      
    // }
    // await this.afAuth.sendPasswordResetEmail(email).then(() => {
    //   return true;
    //    //this.router.navigate(['auth/reset-confirm']);
    //    //this.dialogRef.close();
    //   //  this._matdialog.open(EmailSentComponent, {
    //   //   width: '30%',
    //   //   panelClass: 'custom-modal'
    //   // });
    // }).catch((error) => {
    //   this.toast.openSnackBar(
    //     'Something went wrong. try again later'
    //   );
    //    //this.notifier.showError(error.message);
    // });
 }



}

