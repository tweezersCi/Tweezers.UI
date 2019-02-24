import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './tweezers/modules/grid-module/grid/GridComponent';
import { SingleItemComponent } from './tweezers/modules/single-item/single-item/SingleItemComponent';
import { PageNotFoundComponent } from './tweezers/modules/page-not-found-module/PageNotFoundComponent';
import { LandingComponent } from './tweezers/modules/landing/landing/LandingComponent';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: ':entityName', component: GridComponent},
  {path: ':entity/:id', component: SingleItemComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
