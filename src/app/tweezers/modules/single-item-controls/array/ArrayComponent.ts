import { BaseComponent } from "../../base-component/BaseComponent";
import { Component, Input } from "@angular/core";

@Component({
    selector: "tweezers-array",
    templateUrl: "array.component.html",
    styleUrls: ["array.component.css"]
})
export class ArrayComponent extends BaseComponent {
    @Input() prop: string;
    @Input() item: any;
    @Input() required: boolean = false;
    @Input() objectReference: any;

    internalFields: any;

    ngOnInit(): void {
        console.log(this);
        console.log(Object.values(this.objectReference.fields));
        this.internalFields = Object.values(this.objectReference.fields);
    }

    onChange(e) {

    }

    isString(val) {
        const isString = typeof val;
        return isString == 'string';
    }
}
