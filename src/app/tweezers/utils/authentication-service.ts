import { Injectable } from "@angular/core";
import { TweezersApi } from "./tweezers-api";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

declare let window: any;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(
    protected tweezApi: TweezersApi,
    protected router: Router,
    protected titleModule: Title
  ) {}

  public login(username: string, password: string): Promise<any> {
    return this.tweezApi.login(username, password).then(res => {
      if (res) {
        console.log(res);
        localStorage.setItem("sessionId", res.sessionId);
        localStorage.setItem("username", res.username);
        localStorage.setItem("name", res.name);
      }
    });
  }

  public async isInitialized() {
    return this.tweezApi
      .get(`${this.tweezApi.baseUrl}/api/metadata`)
      .then(res => {
        return Promise.resolve(res.IsInitialized);
      });
  }

  public isLoggedIn() {
    return localStorage && !!localStorage["sessionId"];
  }

  public logout() {
    this.tweezApi.logout().then(res => {
      localStorage.clear();
      window.location.href = "";
    });
  }
}
