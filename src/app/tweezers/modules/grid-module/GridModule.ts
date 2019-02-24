import { NgModule } from '@angular/core';
import { GridComponent } from './grid/GridComponent';
import { CommonModule } from '@angular/common';
import { PageNotFoundModule } from '../page-not-found-module/PageNotFoundModule';

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundModule,
    ],
    declarations: [GridComponent],
    exports: [GridComponent],
})
export class GridModule { }