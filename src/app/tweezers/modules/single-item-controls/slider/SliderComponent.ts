import { BaseComponent } from "../../base-component/BaseComponent";
import { Component, Input } from "@angular/core";

@Component({
    selector: "tweezers-slider",
    templateUrl: "slider.component.html",
    styleUrls: ["slider.component.css"]
})
export class SliderComponent extends BaseComponent {
    @Input() prop: string;
    @Input() header: string;
    @Input() item: any;

    onChange(e) {
        const newValue = e.checked;
        this.item[this.prop] = newValue;
    }
}
