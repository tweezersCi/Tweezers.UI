import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackBarDefinition } from './SnackBarDefinition';

const DefaultIcon = "info";

@Component({
    selector: 'tweezers-snack-bar',
    templateUrl: 'tweezers-snack-bar.component.html',
    styleUrls: ['tweezers-snack-bar.component.css'],
})
export class TweezersSnackBarComponent {
    private snackBarDefinition: SnackBarDefinition
    private icon;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
        this.snackBarDefinition = data;
        this.icon = this.snackBarDefinition.icon;
        console.log(this.snackBarDefinition);
        console.log(this.icon);
    }
}