import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class HomeService {

  constructor(private afs: AngularFirestore) { }

  getHomeBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'events')).valueChanges();
  }

  getTestimonials(): Observable<any> {
    return this.afs.collection<any>('ourTestimonials').valueChanges();
  }

  getSponsors(): Observable<any> {
    return this.afs.collection<any>('ourSponsors').valueChanges();
  }

  getCouncilMembers(): Observable<any> {
    return this.afs.collection<any>('ourCommitteeMembers').valueChanges();
  }

  getAboutUs(): Observable<any> {
    return this.afs.doc<any>('aboutUs/O0w01iO7aJVSGAtjtxaK').valueChanges();
  }

}
