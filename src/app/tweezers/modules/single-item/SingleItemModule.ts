import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundModule } from '../page-not-found-module/PageNotFoundModule';
import { SingleItemComponent } from './single-item/SingleItemComponent';
import { SingleItemControlsModule } from '../single-item-controls/SingleItemControlsModule';

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundModule,
        SingleItemControlsModule,
    ],
    declarations: [SingleItemComponent],
    exports: [SingleItemComponent],
})
export class SingleItemModule { }