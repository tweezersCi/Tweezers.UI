import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../material/AppMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TweezersIconComponent } from './tweezers-icon/TweezersIconComponent';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
    ],
    declarations: [TweezersIconComponent],
    exports: [TweezersIconComponent]
})
export class TweezersInfraModule {}