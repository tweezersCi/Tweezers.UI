import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundModule } from '../page-not-found-module/PageNotFoundModule';
import { LandingComponent } from './landing/LandingComponent';

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundModule,
    ],
    declarations: [LandingComponent],
    exports: [LandingComponent],
})
export class LandingModule { }