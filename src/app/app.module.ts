import { PromotionalBannerComponent } from './components/promotional-banner/promotional-banner.component';
import { LoginComponent } from './pages/login/login.component';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import { MyNotificationsComponent } from './pages/my-notifications/my-notifications.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { ProfileEventDetailsComponent } from './pages/profile-event-details/profile-event-details.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { ProfileListingComponent } from './pages/profile-listing/profile-listing.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { OurSponsorsComponent } from './pages/our-sponsors/our-sponsors.component';
import { OurMembersComponent } from './pages/our-members/our-members.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SharedModule } from './shared/shared.module';
import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { NgxSpinnerModule } from "ngx-spinner";
import { ImageCropperModule } from 'ngx-image-cropper';
import { AgmCoreModule } from '@agm/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { OurGalleryComponent } from './pages/our-gallery/our-gallery.component';
import { OurMembershipComponent } from './pages/our-membership/our-membership.component';
import { EventsGalleryComponent } from './pages/events-gallery/events-gallery.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { environment } from 'src/environments/environment';
import { HomeService } from './services/home.service';
import { SponsorsService } from './services/sponsors.service';
import { GalleryService } from './services/gallery.service';
import { MembersService } from './services/members.service';
import { MembershipService } from './services/membership.service';
import { ToastService } from './services/toast.service';
import { AboutUsService } from './services/about-us.service';
import { NewsService } from './services/news.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { EventsService } from './services/events.service';
import { ProfileService } from './services/profile.service';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsLetterSubscriptionService } from './services/news-letter-subscription.service';
import { ContactService } from './services/contact.service';
import { NgxPayPalModule } from 'ngx-paypal';
import { SponsorRegisterComponent } from './pages/sponsor-register/sponsor-register.component';
import { CommonService } from './services/common.service';
import { SoonPopUpComponent } from './components/soon-pop-up/soon-pop-up.component';
import { EventSuccessPopupComponent } from './pages/event-success-popup/event-success-popup.component';
import { EventFailPopupComponent } from './pages/event-fail-popup/event-fail-popup.component';
import { FreeEventSuccessComponent } from './pages/free-event-success/free-event-success.component';
import { AlertPopupComponent } from './pages/alert-popup/alert-popup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EmailSentComponent } from './pages/email-sent/email-sent.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IndexComponent,
    AboutUsComponent,
    OurMembersComponent,
    OurGalleryComponent,
    OurSponsorsComponent,
    OurMembershipComponent,
    EventsGalleryComponent,
    EventDetailsComponent,
    ContactUsComponent,
    ProfileListingComponent,
    ProfileDetailsComponent,
    //EventDetailsComponent,
    ProfileEventDetailsComponent,
    MyEventsComponent,
    MyNotificationsComponent,
    MySubscriptionsComponent,
    MemberDetailsComponent,
    GalleryComponent,
    LoginComponent,
    PromotionalBannerComponent,
    NewsDetailComponent,
    SoonPopUpComponent,
    SponsorRegisterComponent,
    EventSuccessPopupComponent,
    EventFailPopupComponent,
    FreeEventSuccessComponent,
    AlertPopupComponent,
    ForgotPasswordComponent,
    EmailSentComponent
  ],

  entryComponents: [
    MemberDetailsComponent,
    GalleryComponent,
    LoginComponent,
    SponsorRegisterComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxSpinnerModule,
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule,
    NgxPayPalModule,
    ImageCropperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfruEyfWRjWEu9PHx9nYlzVe76wyILAWw',
      libraries: ['geometry','places']
    }),
  ],
  providers: [HomeService, SponsorsService,GalleryService,MembersService,MembershipService,DatePipe,ToastService,AboutUsService,NewsService,CommonService,EventsService,ProfileService,NewsLetterSubscriptionService,ContactService],
  bootstrap: [AppComponent]

})
export class AppModule { }
