import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class GalleryService {

  constructor(private afs: AngularFirestore) { }

  getGalleryBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'gallery')).valueChanges();
  }

  getGallery(): Observable<any> {
    return this.afs.collection<any>('ourGallery').valueChanges();
  }

}
