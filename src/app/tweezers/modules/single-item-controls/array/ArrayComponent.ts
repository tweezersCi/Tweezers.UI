import { BaseComponent } from "../../base-component/BaseComponent";
import { Component, Input } from "@angular/core";
import { TweezersButton } from "src/app/tweezers/interfaces/tweezers-button";

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
  @Input() displayName: string;

  fieldNum = 1;
   
  internalFields: any;
  addButton: TweezersButton = {
    label: "Add",
    icon: "add",
    clickFunction: this.addItem.bind(this),
    type: "button"
  };

  ngOnInit(): void {
    this.internalFields = Object.values(this.objectReference.fields);
    this.item[this.prop] = this.item[this.prop] || {};
  }

  onChange(e) {}

  isString(val) {
    const isString = typeof val;
    return isString == "string";
  }

  deleteItem(field: any) {
    delete this.item.fields[field];
  }

  addItem() {
    const newField = { 
        name: "new_field_" + this.fieldNum,
        displayName: "New Field " + this.fieldNum,
        newItem: true
    };
    this.fieldNum++;

    this.item[this.prop][newField["name"]] = {fieldProperties: newField};
  }
}
