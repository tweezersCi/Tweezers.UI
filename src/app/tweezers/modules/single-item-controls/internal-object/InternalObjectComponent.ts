import { BaseComponent } from "../../base-component/BaseComponent";
import { Component, Input } from "@angular/core";

@Component({
  selector: "tweezers-internal-object",
  templateUrl: "internal-object.component.html",
  styleUrls: ["internal-object.component.css"]
})
export class InternalObjectComponent extends BaseComponent {
  @Input() prop: string;
  @Input() item: any;
  @Input() required = false;
  @Input() objectReference: any;
  @Input() displayName: string;

  fieldNum = 1;

  internalFields: any;
  ngOnInit(): void {
    this.internalFields = Object.values(this.objectReference.fields);


    this.item[this.prop] = this.item[this.prop] || {};
  }
}
