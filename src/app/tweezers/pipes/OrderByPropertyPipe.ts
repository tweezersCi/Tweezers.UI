import { Injectable, Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: "orderBy",
  pure: false
})
@Injectable()
export class OrderByPropertyPipe implements PipeTransform {
  transform(value: any[], column: string, order): any[] {
    const sortOrder = order || "asc";
    if (!value || !column || column === "") {
      return value;
    }
    if (value.length <= 1) {
      return value;
    }
    return _.orderBy(value, [column], sortOrder);
  }
}
