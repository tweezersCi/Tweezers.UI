import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundModule } from '../page-not-found-module/PageNotFoundModule';
import { LandingComponent } from './landing/LandingComponent';
import { LoginModule } from '../login/LoginModule';

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundModule,
        LoginModule,
    ],
    declarations: [LandingComponent],
    exports: [LandingComponent],
})
export class LandingModule { }