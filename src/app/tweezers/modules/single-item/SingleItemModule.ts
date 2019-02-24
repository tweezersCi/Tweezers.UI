import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundModule } from '../page-not-found-module/PageNotFoundModule';
import { SingleItemComponent } from './single-item/SingleItemComponent';

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundModule,
    ],
    declarations: [SingleItemComponent],
    exports: [SingleItemComponent],
})
export class SingleItemModule { }