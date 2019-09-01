import { Injectable } from "@angular/core";
import { SnackBarDefinition } from "./SnackBarDefinition";
import { MatSnackBar } from "@angular/material";
import { TweezersSnackBarComponent } from "./TweezersSnackBarComponent";

@Injectable({
    providedIn: "root"
})
export class TweezersSnackbarService {
    constructor(private snackBar: MatSnackBar) {

    }

    public OpenSnackbar(definition: SnackBarDefinition, dutationSeconds: number = 5) {
        this.snackBar.openFromComponent(TweezersSnackBarComponent, {
            duration: dutationSeconds * 1000,
            data: definition,
            panelClass: "tweezers-snackbar"
        });
    }
}
