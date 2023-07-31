import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import { MyNotificationsComponent } from './pages/my-notifications/my-notifications.component';
import { MyEventsComponent } from './pages/my-events/my-events.component';
import { ProfileEventDetailsComponent } from './pages/profile-event-details/profile-event-details.component';
import { ProfileDetailsComponent } from './pages/profile-details/profile-details.component';
import { ProfileListingComponent } from './pages/profile-listing/profile-listing.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { OurMembershipComponent } from './pages/our-membership/our-membership.component';
import { OurSponsorsComponent } from './pages/our-sponsors/our-sponsors.component';
import { OurGalleryComponent } from './pages/our-gallery/our-gallery.component';
import { OurMembersComponent } from './pages/our-members/our-members.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { EventsGalleryComponent } from './pages/events-gallery/events-gallery.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'prefix',
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'our-members',
        component: OurMembersComponent,
      },
      {
        path: 'our-gallery',
        component: OurGalleryComponent,
      },
      {
        path: 'our-sponsors',
        component: OurSponsorsComponent,
      },
      {
        path: 'our-membership',
        component: OurMembershipComponent,
      },
      {
        path: 'events-gallery',
        component: EventsGalleryComponent,
      },
      {
        path: 'event-details/:id',
        component: EventDetailsComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'news-detail',
        component: NewsDetailComponent,
      },
      {
        path: 'profile',
        component: ProfileListingComponent,
        children: [
          {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full',
          },
          {
            path: 'details',
            component: ProfileDetailsComponent,
          },
          {
            path: 'my-events',
            component: MyEventsComponent,
          },
          {
            path: 'my-notifications',
            component: MyNotificationsComponent,
          },
          {
            path: 'my-subscriptions',
            component: MySubscriptionsComponent,
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
      scrollPositionRestoration: 'top',
      // relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
