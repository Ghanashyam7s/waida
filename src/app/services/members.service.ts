import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class MembersService {

  constructor(private afs: AngularFirestore) { }

  getMembersBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'members')).valueChanges();
  }

  getMembers(): Observable<any> {
    // return this.afs.collection<any>('ourMembers', ref => ref.where('status', '==', 'APPROVED')).valueChanges();
    return this.afs.collection<any>('ourMembers', ref => ref.where('status', '==', 'PENDING')).valueChanges();
  }

}
