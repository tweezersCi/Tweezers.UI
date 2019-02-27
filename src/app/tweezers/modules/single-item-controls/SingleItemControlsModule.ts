import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../material/AppMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TextBoxComponent } from './text-box/TextBoxComponent';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
    ],
    declarations: [TextBoxComponent],
    exports: [TextBoxComponent]
})
export class SingleItemControlsModule {}