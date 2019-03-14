import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../material/AppMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TweezersIconComponent } from './tweezers-icon/TweezersIconComponent';
import { HeaderComponent } from './header/HeaderComponent';
import { RoundButtonComponent } from './round-button/RoundButtonComponent';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
    ],
    declarations: [TweezersIconComponent, HeaderComponent, RoundButtonComponent],
    exports: [TweezersIconComponent, HeaderComponent, RoundButtonComponent]
})
export class TweezersInfraModule {}