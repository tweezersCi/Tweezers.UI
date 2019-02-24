import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweezersApi } from './tweezers/utils/tweezers-api';
import { GridModule } from './tweezers/modules/grid-module/GridModule';
import { LayoutModule } from './tweezers/modules/layout/LayoutModule';
import { PageNotFoundModule } from './tweezers/modules/page-not-found-module/PageNotFoundModule';
import { SingleItemModule } from './tweezers/modules/single-item/SingleItemModule';
import { LandingModule } from './tweezers/modules/landing/LandingModule';
import { AppMaterialModule } from './tweezers/material/AppMaterialModule';
import { SideMenuModule } from './tweezers/modules/side-menu/SideMenuModule';
import { BaseComponent } from './tweezers/modules/base-component/BaseComponent';


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    SingleItemModule,
    LayoutModule,
    PageNotFoundModule,
    LandingModule,
    SideMenuModule
  ],
  providers: [TweezersApi, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private router: Router) {}
}