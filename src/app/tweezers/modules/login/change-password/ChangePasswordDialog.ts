import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TweezersApi } from "src/app/tweezers/utils/tweezers-api";
import { TweezersButton } from "src/app/tweezers/interfaces/tweezers-button";

@Component({
  selector: "change-password-dialog",
  templateUrl: "change-password.dialog.html",
  styleUrls: ["change-password.dialog.css"]
})
export class ChangePasswordDialog {
  private oldPassword: string;
  private newPassword: string;
  private confirmNewPassword: string;
  private errorMsg: string;
  private buttons: TweezersButton[] = [
    {
      label: "confirm",
      icon: "fingerprint",
      clickFunction: this.onOk.bind(this)
    },
    {
      label: "close",
      icon: "close",
      clickFunction: this.onCancel.bind(this)
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected tweezApi: TweezersApi
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMsg = "Passwords do not match";
      return;
    }

    this.tweezApi
      .changePassword(
        this.oldPassword,
        this.newPassword,
        this.confirmNewPassword
      )
      .then(res => {
        this.dialogRef.close();
      })
      .catch(err => {
        this.errorMsg = err.error.message;
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmNewPassword = "";
      });
  }
}
