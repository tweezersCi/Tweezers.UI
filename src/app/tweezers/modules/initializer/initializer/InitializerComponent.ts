import { Component, ViewChild } from "@angular/core";
import { BaseComponent } from "../../base-component/BaseComponent";
import { TweezersButton } from "src/app/tweezers/interfaces/tweezers-button";
import { InitialDetails } from "./InitialDetails";
import { MatCard } from "@angular/material";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";

declare let window;

@Component({
  selector: "initializer",
  templateUrl: "initializer.component.html",
  styleUrls: ["initializer.component.css"],
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0
        })
      ),
      transition("void <=> *", animate(500))
    ])
  ]
})
export class InitializerComponent extends BaseComponent {
  title: string;
  cardNumber: number = 0;

  initialDetails: InitialDetails = {
    dbDetails: {
      dbType: "",
      dbName: "",
      host: "",
      port: 0,
      username: "",
      password: ""
    },
    appDetails: {
      title: "",
      initialUsername: "",
      initialPassword: "",
      canChangeSchema: false
    }
  };

  dbValues: string[] = ["MongoDB"];

  firstCardButtons: TweezersButton[] = [
    {
      label: "next",
      icon: "chevron_right",
      clickFunction: this.onNext.bind(this)
    },
    {
      label: "clear",
      icon: "settings_backup_restore",
      clickFunction: this.onClear.bind(this)
    }
  ];

  secondCardButtons: TweezersButton[] = [
    {
      label: "save",
      icon: "save",
      clickFunction: this.onSave.bind(this)
    },
    {
      label: "clear",
      icon: "settings_backup_restore",
      clickFunction: this.onClear.bind(this)
    },
    {
      label: "previous",
      icon: "chevron_left",
      clickFunction: this.onPrev.bind(this)
    }
  ];

  ngOnInit(): void {
    console.log("initializer");
  }

  onSave() {
      this.tweezApi.post(`${this.tweezApi.baseUrl}/api/metadata/initialize`, this.initialDetails).then((res) => {
        window.location.href = "";
      });
  }

  onNext() {
    this.cardNumber = 1;
  }

  onPrev() {
    this.cardNumber = 0;
  }

  onClear() {
    if (this.cardNumber === 0) {
      this.initialDetails.appDetails = {
        title: "",
        initialUsername: "",
        initialPassword: "",
        canChangeSchema: false
      };
    } else {
      this.initialDetails.dbDetails = {
        dbType: "",
        dbName: "",
        host: "",
        port: 0,
        username: "",
        password: ""
      };
    }
  }
}
