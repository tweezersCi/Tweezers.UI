import { Component, Input } from "@angular/core";
import { BaseComponent } from '../../base-component/BaseComponent';

@Component({
    selector: 'tweezers-dropdown',
    templateUrl: 'dropdown.component.html',
    styleUrls: ['dropdown.component.css']
})
export class DropdownComponent extends BaseComponent{
    @Input() prop: string;
    @Input() fieldData: any;
    @Input() item: any;
    @Input() allowNone: boolean;
    fieldKeys: string[]

    ngOnInit(): void {
        this.fieldKeys = Object.keys(this.fieldData.values);
    }

    onChange(e) {
        const newValue = e.value;
        this.item[this.prop] = newValue;
    }
}
