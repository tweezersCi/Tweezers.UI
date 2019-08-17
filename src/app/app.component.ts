import { Component, SimpleChanges, NgModule } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { AppModule } from "./app.module";
import { AuthenticationService } from "./tweezers/utils/authentication-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  loading: boolean;
  title = "TweezersUi";
  isLoggedIn: boolean;
  isInitialized: boolean;

  constructor(private authService: AuthenticationService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.isInitialized().then(res => {
      this.isInitialized = res;
      this.loading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
}
