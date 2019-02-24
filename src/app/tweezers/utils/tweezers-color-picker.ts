import { ElementRef } from '@angular/core';
import { config } from '../../../../tweezers-conf.json'

const colorToken = "COLOR_TOKEN";

export class TweezersColorPicker {
    static color: string = ''; 

    public static changeColor(elementRef: any) {
        if (!this.color) {
            this.color = config.color;
        }

        const realElement = elementRef.nativeElement || (elementRef['_elementRef'] || elementRef['_element']).nativeElement;
        if (realElement) {
            realElement.classList.replace(colorToken, this.color);
        }
    }
}