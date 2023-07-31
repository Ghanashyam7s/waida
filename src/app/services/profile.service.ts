import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  hide:boolean = false

  constructor(private afs: AngularFirestore, private toast: ToastService, public afAuth: AngularFireAuth) { }

  getProfile(uid): Observable<any> {
    return this.afs.doc<any>(`ourMembers/${uid}`).valueChanges();
  }



  async updateProfile(userData,uid,name) {
    try {
     // apptdata.id = this.afs.createId()
      await  this.afs.doc(`ourMembers/${uid}`).update(userData);
      this.toast.openSnackBar('Your details updated Successfully');
      console.log(name)
      //this.hide = true


     await (await this.afAuth.currentUser).updateProfile({
        displayName: name
      }).then(() => {
        console.log('DisplayName updated')
      }).catch(err => console.log(err))


    //  await this.afAuth.onAuthStateChanged(function (user) {
    //     user.updateProfile({
    //        displayName:name
    //     })

    //     if (user) {
    //       console.log(user)
    //     } else {

    //     }
    //   });

     // return true;
    } catch (err) {
      console.log(err);
      this.toast.openSnackBar('You Failed to update your details');
      return false;
    }



  }


  // updateProfile(userData,uid,name){

  //   console.log(userData)




  //   console.log(userData)
  //   console.log(uid)
  //   this.afs.doc(`ourMembers/${uid}`).update(userData);

       // return this.afAuth.authState;

  //  this.afAuth.onAuthStateChanged(function (user) {
  //   user.updateProfile({
  //      displayName:name
  //     //photoURL: '',
  //   //  // phoneNumber:'9090909090'



  //   })

  //   if (user) {
  //     console.log(user)


  //   } else {

  //   }
  // });

 // }


async updateProfileImage(image,uid){


 // console.log(userImage.image)


  try {
    // apptdata.id = this.afs.createId()

    console.log(image)
    console.log(uid)
     await  this.afs.doc(`ourMembers/${uid}`).update({image:image,status:"PENDING"});




    // await (await this.afAuth.currentUser).updateProfile({
    //   photoURL: userImage.image
    //  }).then(() => {
    //    //console.log('DisplayName updated')
    //  }).catch(err => console.log(err))


   //  await this.afAuth.onAuthStateChanged(function (user) {
   //     user.updateProfile({
   //        displayName:name
   //     })

   //     if (user) {
   //       console.log(user)
   //     } else {

   //     }
   //   });

    // return true;
   }

   catch (err) {
     console.log(err);
     this.toast.openSnackBar(`Image Size Should Be Less Then 1MB, Can't uplode...!!!`);
     return false;
   }





  // this.afs.doc(`ourMembers/${uid}`).update(userImage);

  // this.afAuth.onAuthStateChanged(function (user) {
  //   user.updateProfile({
  //      photoURL  :  userImage.image
  //     //photoURL: '',
  //   //  // phoneNumber:'9090909090'



  //   })
  //   if (user) {
  //     console.log(user)
  //   } else {

  //   }
  // });

}




  // async bookAppointment(apptdata: any): Promise<boolean> {
  //   try {
  //     apptdata.id = this.afs.createId()
  //     await this.afs.doc(`appointments/${apptdata.id}`).set(apptdata);
  //     this.toast.openSnackBar('Appointment Added Successfully');
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //     this.toast.openSnackBar('You Failed To Add Appointment');
  //     return false;
  //   }

  // }


  getMyNotifications(uid): Observable<any> {
    return this.afs.collection<any>('userNotifications', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  getCurrentUserData(id){
    return this.afs.doc<any>(`ourMembers/${id}`).valueChanges();

  }





}
