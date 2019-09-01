import { Component, Input } from "@angular/core";
import { BaseComponent } from "../../base-component/BaseComponent";
import { TweezersButton } from "src/app/tweezers/interfaces/tweezers-button";

@Component({
    selector: "tweezers-header",
    templateUrl: "header.component.html",
    styleUrls: ["header.component.css"]
})
export class HeaderComponent extends BaseComponent {
    @Input() title: string;
    @Input() headerIcon: string;
    @Input() buttons: TweezersButton[];
}
