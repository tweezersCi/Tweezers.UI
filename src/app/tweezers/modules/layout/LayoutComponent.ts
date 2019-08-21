import { Component, ViewChild, ElementRef } from "@angular/core";
import { BaseComponent } from "../base-component/BaseComponent";
import { MatDrawer, MatToolbar, MatDialog } from "@angular/material";
import { ChangePasswordDialog } from "../login/change-password/ChangePasswordDialog";
import { TweezersCache } from '../../utils/tweezers-cache';
import { TweezersApi } from '../../utils/tweezers-api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../utils/authentication-service';

declare let window;

@Component({
  selector: "layout",
  templateUrl: "layout.html",
  styleUrls: ["layout.css"]
})
export class LayoutComponent extends BaseComponent {
  title: string;
  username: string;
  userFullName: string;

  constructor(protected tweezCache: TweezersCache, protected tweezApi: TweezersApi,
    protected router: Router, protected titleModule: Title, protected authService:AuthenticationService, 
    public dialog: MatDialog) {
        super(tweezCache, tweezApi, router, titleModule, authService);
    }

  ngOnInit(): void {
    window.layout = this;

    this.tweezCache.getGeneralMetadata().then(res => {
      this.title = res.Title;
      this.titleModule.setTitle(`${this.title} - Tweezers`);
    });

    this.username = localStorage.username;
    this.userFullName = localStorage.name;
  }

  ngAfterViewInit(): void {}

  logout() {
    this.authService.logout();
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialog, {
        width: "400px"
    });
  }
}
