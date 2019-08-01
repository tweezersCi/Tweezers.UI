import { Component, SimpleChanges, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from './app.module';
import { AuthenticationService } from './tweezers/utils/authentication-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TweezersUi';
  isLoggedIn: boolean;

  constructor(private activeRoute: ActivatedRoute, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
}
