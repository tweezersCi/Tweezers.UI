import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatTableModule,
  MatTooltipModule,
  MatExpansionModule,
  MatCardModule,
  MatSnackBarModule,
  MatChipsModule,
  MatSortModule
} from "@angular/material";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSortModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatSnackBarModule,
    MatChipsModule,
    MatSortModule,
  ]
})
export class AppMaterialModule {}
