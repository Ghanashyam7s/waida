import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import { keyWordsClass } from '../shared/common-functions';
@Injectable()
export class EventsService {

  constructor(private afs: AngularFirestore, private toast: ToastService) { }

  getWaidaEvents(): Observable<any> {
    return this.afs.collection<any>('events', ref => ref.where('type', '==', "WAIDA_EVENTS").where('status', '==', 'ACTIVE')).valueChanges();
  }

  getNonWaidaEvents(): Observable<any> {
    return this.afs.collection<any>('events', ref => ref.where('type', '==', "NON_WAIDA_EVENTS").where('status', '==', 'ACTIVE')).valueChanges();
  }



  getEventDetails(id: string): Observable<any> {
    return this.afs.doc<any>(`events/${id}`).valueChanges()
  }

  getEventsByDate(){
    return this.afs.collection<any>('events', ref => ref.where('status', '==', "ACTIVE")).valueChanges();
   // return this.afs.collection<any>('blogs', ref => ref.where('serviceId', '==', serviceId).where('status', '==', 'PUBLISHED')).valueChanges()
  }


  async enrollForEvent(enrollData: any): Promise<boolean> {
    try {
      enrollData.id = this.afs.createId()
      //enrollData.keywords  =  keyWordsClass.getAllCombinations(enrollData.name)

      await this.afs.doc(`eventEnrollments/${enrollData.id}`).set(enrollData);
      await this.afs.doc(`userNotifications/${enrollData.id}`).set(enrollData

        // body : "Event Boking Confirmed",
        // title: enrollData.eventName,
        // eventDate:enrollData.eventDate,
        // uid:enrollData.uid,
        // time:enrollData.eventTime,
        // eventImage:enrollData.eventImage,
        // //eventEndDate:enrollData.endDate


      );
      this.toast.openSnackBar('Event Booked Successfully');
      return true;
    } catch (err) {
      console.log(err);
      this.toast.openSnackBar('You Failed To Book This Event');
      return false;
    }


  }

  getMyAllEvents(uid): Observable<any> {
    return this.afs.collection<any>('eventEnrollments', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  getEventsBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'events')).valueChanges();
  }

  getEventDetailsBanners(): Observable<any> {
    return this.afs.collection<any>('homeBanners', ref => ref.where('type', '==', 'event_details')).valueChanges();
  }

  //.collection('blogComments', (ref) => ref.where('blogId', '==', blogId).where('status', '==', 'approved'))

  getEvents(){

    return this.afs.collection<any>('events', ref => ref.where('status', '==', 'ACTIVE')).valueChanges();

  }

  getDisclimer(){

    return this.afs.doc<any>('disclaimer/GTPzQwiB3BUJQGsCV9GG').valueChanges();

  }

  getBookedEventMenmbersById(id:any):Observable<any> {

    return this.afs.collection<any>('eventEnrollments', ref => ref.where('eventId', '==', id)).valueChanges()

  }

}
