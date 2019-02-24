import { MatInputModule, MatButtonModule, MatSelectModule, MatToolbarModule, MatSidenavModule, MatCheckboxModule, MatIconModule, MatListModule, MatDividerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        MatListModule
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
        MatListModule
    ]
})
export class AppMaterialModule { }