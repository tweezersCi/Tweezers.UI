import { NgModule } from "@angular/core";
import { GridComponent } from "./grid/GridComponent";
import { CommonModule } from "@angular/common";
import { PageNotFoundModule } from "../page-not-found-module/PageNotFoundModule";
import { AppMaterialModule } from "../../material/AppMaterialModule";
import { TweezersInfraModule } from "../infra/TweezersInfraModule";

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundModule,
        AppMaterialModule,
        TweezersInfraModule,
    ],
    declarations: [GridComponent],
    exports: [GridComponent],
})
export class GridModule { }
