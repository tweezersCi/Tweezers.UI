import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppMaterialModule } from "../../material/AppMaterialModule";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";
import { SideMenuComponent } from "./side-menu/SideMenuComponent";
import { SideMenuItemComponent } from "./side-menu-item/SideMenuItemComponent";
import { TweezersInfraModule } from "../infra/TweezersInfraModule";

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        TweezersInfraModule,
    ],
    declarations: [SideMenuComponent, SideMenuItemComponent],
    exports: [SideMenuComponent, SideMenuItemComponent]
})
export class SideMenuModule {}
