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

  possibleValuesDict: any = {};
  fieldNum = 1;

  internalFields: any;
  async ngOnInit(): Promise<any> {
    this.internalFields = Object.values(this.objectReference.fields);

    for (const field of this.internalFields) {
      this.possibleValuesDict[field.fieldProperties.name] = await this.constructPossibleValues(field);
    }

    this.item[this.prop] = this.item[this.prop] || {};
  }
}
