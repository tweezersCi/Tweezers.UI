import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageNotFoundModule } from "../page-not-found-module/PageNotFoundModule";
import { SingleItemComponent } from "./single-item/SingleItemComponent";
import { SingleItemControlsModule } from "../single-item-controls/SingleItemControlsModule";
import { TweezersInfraModule } from "../infra/TweezersInfraModule";
import { AppMaterialModule } from "../../material/AppMaterialModule";
import { SingleItemHeaderComponent } from "./single-item-header/SingleItemHeaderComponent";
import { GridModule } from "../grid-module/GridModule";
import { PipesModule } from "../../pipes/PipesModule";

@NgModule({
  imports: [
    CommonModule,
    PageNotFoundModule,
    SingleItemControlsModule,
    TweezersInfraModule,
    AppMaterialModule,
    GridModule,
    PipesModule
  ],
  declarations: [SingleItemComponent, SingleItemHeaderComponent],
  exports: [SingleItemComponent, SingleItemHeaderComponent]
})
export class SingleItemModule {}
