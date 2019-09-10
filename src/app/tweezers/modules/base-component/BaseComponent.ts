import { TweezersCache } from "../../utils/tweezers-cache";
import { TweezersApi } from "../../utils/tweezers-api";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthenticationService } from "../../utils/authentication-service";

@Component({
  selector: "base-component",
  template: ""
})
export class BaseComponent {
  constructor(
    protected tweezCache: TweezersCache,
    protected tweezApi: TweezersApi,
    protected router: Router,
    protected titleModule: Title,
    protected authService: AuthenticationService
  ) {}

  async constructPossibleValues(field): Promise<any> {
    if (field.fieldProperties.possibleValues) {
      const possibleValues = field.fieldProperties.possibleValues;
      const valuesDict = {};
      for (const value of possibleValues) {
        valuesDict[value] = value;
      }

      return Promise.resolve({ items: valuesDict, icon: "" });
    }

    if (field.fieldProperties.objectName) {
      const objName = field.fieldProperties.objectName;
      const take = 1024;
      const response = await this.tweezApi.getEntities(
        `${objName}?sortField=_id&direction=asc&skip=0&take=${take}`
      );
      const metadata = await this.tweezApi.getEntityMetadata(objName);
      const idField = "_id";
      const uiTitleKey = Object.keys(metadata.fields).find(
        fk => metadata.fields[fk].fieldProperties.uiTitle
      );
      const displayField = metadata.fields[uiTitleKey].fieldProperties.name;
      const valuesDict = {};
      for (const item of response.items) {
        valuesDict[item[idField]] = item[displayField];
      }
      return Promise.resolve({ items: valuesDict, icon: metadata.icon });
    }

    return Promise.resolve(null);
  }
}
