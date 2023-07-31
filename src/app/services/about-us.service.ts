import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class AboutUsService {

  constructor(private afs: AngularFirestore) { }

  getCouncilMembers(): Observable<any> {
    return this.afs.collection<any>('ourCommitteeMembers').valueChanges();
  }

  getAboutUsBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'about')).valueChanges();
  }



}
