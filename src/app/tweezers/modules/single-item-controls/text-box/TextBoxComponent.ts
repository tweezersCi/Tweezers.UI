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
    @Input() inputType: string;
    @Input() required: boolean = false;

    ngOnInit(): void {
    }

    onChange(e) {
        const newValue = e.target.value;
        this.item[this.prop] = newValue;
    }

    determineInputType() {
        switch (this.inputType) {
            case "String": return "text";
            case "Integer": return "number";
            case "Password": return "password";
            default: return "text";
        }
    }
}