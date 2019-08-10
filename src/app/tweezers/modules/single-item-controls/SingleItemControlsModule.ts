import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../material/AppMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TextBoxComponent } from './text-box/TextBoxComponent';
import { DropdownComponent } from './dropdown/DropdownComponent';
import { SliderComponent } from './slider/SliderComponent';
import { ArrayComponent } from './array/ArrayComponent';
import { TweezersInfraModule } from '../infra/TweezersInfraModule';
import { MultipleSelectComponent } from './multiple-select/MultipleSelectComponent';

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
    declarations: [TextBoxComponent, DropdownComponent, SliderComponent, ArrayComponent, MultipleSelectComponent],
    exports: [TextBoxComponent, DropdownComponent, SliderComponent, ArrayComponent, MultipleSelectComponent]
})
export class SingleItemControlsModule {}