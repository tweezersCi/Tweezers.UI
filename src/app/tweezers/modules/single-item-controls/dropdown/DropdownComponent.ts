import { Component, Input } from "@angular/core";
import { BaseComponent } from "../../base-component/BaseComponent";

@Component({
    selector: "tweezers-dropdown",
    templateUrl: "dropdown.component.html",
    styleUrls: ["dropdown.component.css"]
})
export class DropdownComponent extends BaseComponent {
    @Input() prop: string;
    @Input() displayName: string;
    @Input() values: any;
    @Input() item: any;
    @Input() allowNone: boolean;
    @Input() icon = "";
    @Input() referenceLink = "";

    fieldKeys: string[];

    ngOnInit(): void {
    }

    onChange(e) {
        const newValue = e.value;
        this.item[this.prop] = newValue;
    }

    navigateToItem() {
        const url = `${this.referenceLink}/${this.item[this.prop]}`;
        this.router.navigate([url], {}).then((res) => {
            window.location.reload();
        });
    }
}
