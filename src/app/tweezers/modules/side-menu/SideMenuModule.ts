import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../material/AppMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SideMenuComponent } from './side-menu/SideMenuComponent';
import { SideMenuItemComponent } from './side-menu-item/SideMenuItemComponent';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
    ],
    declarations: [SideMenuComponent, SideMenuItemComponent],
    exports: [SideMenuComponent, SideMenuItemComponent]
})
export class SideMenuModule {}