import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base-component/BaseComponent';
import { TweezersButton } from 'src/app/tweezers/interfaces/tweezers-button';

@Component({
    selector: 'tweezers-round-button',
    templateUrl: "round-button.component.html",
    styleUrls: ["round-button.component.css"]
})
export class RoundButtonComponent extends BaseComponent{
    @Input() buttonDetails: TweezersButton;
    type: string;

    ngOnInit(): void {
     
    }

    onButtonClick() {
        if (this.buttonDetails.clickFunction) {
            this.buttonDetails.clickFunction();
        }
    }
}