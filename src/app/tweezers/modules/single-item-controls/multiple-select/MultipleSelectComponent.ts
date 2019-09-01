import { Component, Input } from "@angular/core";
import { BaseComponent } from "../../base-component/BaseComponent";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material";

@Component({
  selector: "tweezers-multiple-select",
  templateUrl: "multiple-select.component.html",
  styleUrls: ["multiple-select.component.css"]
})
export class MultipleSelectComponent extends BaseComponent {
  @Input() prop: string;
  @Input() displayName: string;
  @Input() values: string[];
  @Input() item: any;
  fieldKeys: string[];
  placeholder: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
      this.values = this.item[this.prop] || [];
      this.refreshPlaceholder();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || "").trim();

    // Add our value
    if (value && this.values.indexOf(value) < 0) {
      this.values.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.item[this.prop] = this.values;
    this.refreshPlaceholder();
  }

  remove(value: string): void {
    const index = this.values.indexOf(value);

    if (index >= 0) {
      this.values.splice(index, 1);
    }

    this.item[this.prop] = this.values;
    this.refreshPlaceholder();
  }

  refreshPlaceholder() {
    this.placeholder = this.values.length === 0 ? `New ${this.displayName}` : this.displayName;
  }
}
