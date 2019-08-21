import { NgModule } from "@angular/core";
import { LayoutComponent } from "./LayoutComponent";
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../material/AppMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SideMenuModule } from '../side-menu/SideMenuModule';
import { TweezersInfraModule } from '../infra/TweezersInfraModule';
import { LoginModule } from '../login/LoginModule';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        SideMenuModule,
        TweezersInfraModule,
        LoginModule
    ],
    declarations: [LayoutComponent],
    exports: [LayoutComponent]
})
export class LayoutModule {}