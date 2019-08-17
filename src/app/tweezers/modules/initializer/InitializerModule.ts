import { InitializerComponent } from './initializer/InitializerComponent';
import { AppMaterialModule } from '../../material/AppMaterialModule';
import { TweezersInfraModule } from '../infra/TweezersInfraModule';
import { SingleItemControlsModule } from '../single-item-controls/SingleItemControlsModule';
import { PageNotFoundModule } from '../page-not-found-module/PageNotFoundModule';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundModule,
        SingleItemControlsModule,
        TweezersInfraModule,
        AppMaterialModule, 
        FormsModule
    ],
    declarations: [
        InitializerComponent
    ],
    exports: [
        InitializerComponent
    ],
})
export class InitializerModule { }