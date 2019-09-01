import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GridComponent } from "./tweezers/modules/grid-module/grid/GridComponent";
import { SingleItemComponent } from "./tweezers/modules/single-item/single-item/SingleItemComponent";
import { LandingComponent } from "./tweezers/modules/landing/landing/LandingComponent";
import { LoginComponent } from "./tweezers/modules/login/login/LoginComponent";
import { AuthGuard } from "./tweezers/guards/auth.guard";
import { NoLoginGuard } from "./tweezers/guards/no.login.guard";

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [NoLoginGuard]},
  {path: "", component: LandingComponent, canActivate: [AuthGuard]},
  {path: ":entityName", component: GridComponent, canActivate: [AuthGuard]},
  {path: ":entity/:id", component: SingleItemComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
