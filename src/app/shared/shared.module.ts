
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './modules/components/banner/banner.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [BannerComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SwiperModule,
    PerfectScrollbarModule,
    AppRoutingModule

  ],
  exports: [
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BannerComponent,
    PerfectScrollbarModule
  ],
})
export class SharedModule { }
