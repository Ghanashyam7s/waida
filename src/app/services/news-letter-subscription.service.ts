import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { keyWordsClass } from '../shared/common-functions';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class NewsLetterSubscriptionService {

  constructor(private afs: AngularFirestore, private toast: ToastService) { }

  async subcription(subcription: any): Promise<boolean> {

   // enquiryDetails.id = this.afs.createId()
  //  await this.afs.doc(`enquiries/${enquiryDetails.id}`)


    try {
      subcription.id = this.afs.createId()

   //   subcription.keywords = keyWordsClass.getAllCombinations(subcription.email)

      await this.afs.doc(`newsletterSubscription/${subcription.id}`).set(subcription)
      this.toast.openSnackBar('Subscribed Successfully');
      return true;
    } catch (err) {
      console.log(err);
      this.toast.openSnackBar('Subscription Failed');
      return false;
    }




  }

}
