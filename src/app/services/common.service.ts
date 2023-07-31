import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class CommonService {

  constructor(private afs: AngularFirestore) { }

  getGeneralSettings(){
    return this.afs.doc<any>('generalSettings/generalSettings').valueChanges();
   // return this.afs.collection<any>('blogs', ref => ref.where('serviceId', '==', serviceId).where('status', '==', 'PUBLISHED')).valueChanges()
  }

}
