import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class NewsService {

  constructor(private afs: AngularFirestore) { }

  getNews(): Observable<any> {
    return this.afs.collection<any>('ourNews', ref => ref.where('status', '==', 'PUBLISHED')).valueChanges();
  }

  getNewsDetails(id: string): Observable<any> {

    return this.afs.doc<any>(`ourNews/${id}`).valueChanges()

  }

}
