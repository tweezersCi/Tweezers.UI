import { Component, Input } from "@angular/core";
import { BaseComponent } from '../../base-component/BaseComponent';

@Component({
    selector: 'tweezers-text-box',
    templateUrl: 'text-box.component.html',
    styleUrls: ['text-box.component.css']
})
export class TextBoxComponent extends BaseComponent{
    @Input() prop: string;
    @Input() header: string;
    @Input() item: any;

    ngOnInit(): void {
    }

    onChange(e) {
        const newValue = e.target.value;
        this.item[this.prop] = newValue;
    }
}