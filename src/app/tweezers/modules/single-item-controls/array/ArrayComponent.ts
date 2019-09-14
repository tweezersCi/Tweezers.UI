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
  @Input() required = false;
  @Input() objectReference: any;
  @Input() displayName: string;

  possibleValuesDict: any = {};
  fieldNum = 1;
  itemLength: number;

  internalFields: any;
  addButton: TweezersButton = {
    label: "Add Field",
    icon: "add",
    clickFunction: this.addItem.bind(this),
    type: "button"
  };

  async ngOnInit() {
    this.internalFields = Object.values(this.objectReference.fields).filter(
      (f: any) => !f.fieldProperties.uiIgnore
    );

    const entities: any[] = Object.values(this.item[this.prop]);
    for (const entity of entities) {
      entity.fieldProperties.expanded = false;
    }
    this.itemLength = entities.length;

    for (const field of this.internalFields) {
      this.possibleValuesDict[
        field.fieldProperties.name
      ] = await this.constructPossibleValues(field);
    }

    this.item[this.prop] = this.item[this.prop] || {};
  }

  onChange(e) {}

  isString(val) {
    const isString = typeof val;
    return isString === "string";
  }

  deleteItem(field: any) {
    delete this.item.fields[field];
    this.itemLength--;
  }

  addItem() {
    const newField = {
      name: "new_field_" + this.fieldNum,
      displayName: "New Field " + this.fieldNum,
      expanded: true,
      orderNum: this.itemLength++
    };

    this.item[this.prop][newField.name] = { fieldProperties: newField };
    this.fieldNum++;
  }

  moveUp(e) {
    const myOrderNum = e.fieldProperties.orderNum;
    const aboveMeObjs: any[] = Object.values(this.item[this.prop]).filter(
      (o: any) => o.fieldProperties.orderNum < myOrderNum
    );

    if (aboveMeObjs.length === 0) {
      return;
    }

    const aboveMeObj = aboveMeObjs[aboveMeObjs.length - 1];

    e.fieldProperties.orderNum = aboveMeObj.fieldProperties.orderNum;
    aboveMeObj.fieldProperties.orderNum = myOrderNum;
  }

  moveDown(e) {
    const myOrderNum = e.fieldProperties.orderNum;
    const belowMeObjs: any[] = Object.values(this.item[this.prop]).filter(
      (o: any) => o.fieldProperties.orderNum > myOrderNum
    );

    if (belowMeObjs.length === 0) {
      return;
    }

    const belowMeObj = belowMeObjs[0];

    e.fieldProperties.orderNum = belowMeObj.fieldProperties.orderNum;
    belowMeObj.fieldProperties.orderNum = myOrderNum;
  }

  expandCollapse(k) {
    this.item[this.prop][k].fieldProperties.expanded = !this.item[this.prop][k]
      .fieldProperties.expanded;
  }
}
