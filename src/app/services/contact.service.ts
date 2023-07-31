import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';
import { keyWordsClass } from '../shared/common-functions';

@Injectable()
export class ContactService {

  constructor(private afs: AngularFirestore, private toast: ToastService) { }

  async saveEnquiry(enquiryDetails: any): Promise<boolean> {

    try {
      enquiryDetails.id = this.afs.createId()
      enquiryDetails.keywords = keyWordsClass.getAllCombinations(enquiryDetails.name)
      await this.afs.doc(`enquiries/${enquiryDetails.id}`).set(enquiryDetails, { merge: true });
      this.toast.openSnackBar('Submitted Successfully');
      return true;
    } catch (err) {
      console.log(err);
      this.toast.openSnackBar('Submition Failed');
      return false;
    }
  }

  getContactBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'contact')).valueChanges();
  }

}
