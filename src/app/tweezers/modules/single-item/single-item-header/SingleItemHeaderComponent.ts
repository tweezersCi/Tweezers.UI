import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base-component/BaseComponent';
import { TweezersButton } from 'src/app/tweezers/interfaces/tweezers-button';

@Component({
    selector: 'tweezers-single-item-header',
    templateUrl: "single-item-header.component.html",
    styleUrls: ["single-item-header.component.css"]
})
export class SingleItemHeaderComponent extends BaseComponent{
    @Input() entityData: any;
    @Input() itemName: string;
    @Input() buttons: TweezersButton[];
}