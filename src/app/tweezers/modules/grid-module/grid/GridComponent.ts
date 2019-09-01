import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Subscription, merge } from "rxjs";
import { TweezersApi } from "src/app/tweezers/utils/tweezers-api";
import { NavigationEnd, Router } from "@angular/router";
import { TweezersCache } from "src/app/tweezers/utils/tweezers-cache";
import { Title } from "@angular/platform-browser";
import { BaseComponent } from "../../base-component/BaseComponent";
import * as _ from "lodash";
import { TweezersButton } from "src/app/tweezers/interfaces/tweezers-button";
import { AuthenticationService } from "src/app/tweezers/utils/authentication-service";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material";

declare let window;

@Component({
    selector: "tweezers-grid",
    templateUrl: "grid.component.html",
    styleUrls: ["grid.component.css"]
})
export class GridComponent extends BaseComponent implements AfterViewInit {
    routerEventsSubscription: Subscription;
    buttons: TweezersButton[] = [
        {
            label: "Add",
            icon: "add",
            clickFunction: this.onAddItemClicked.bind(this),
        }
    ];

    valid: boolean;
    loading = false;

    entities: any[] = [];
    headers: any;
    propertyData: any;
    fields: string[] = [];
    displayedColumns: string[] = [];
    idFieldName: string;
    refLink: string;
    gridName: string;
    iconName: string;
    totalLength: number;

    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
                protected titleModule: Title, protected authService: AuthenticationService) {
        super(tweezCache, tweezApi, router, titleModule, authService);

        this.refLink = this.router.url;
        this.loadData(0, 10);

        this.routerEventsSubscription = this.router.events.subscribe(ev => {
            if (ev instanceof NavigationEnd) {
                this.refLink = ev.url;
                this.loadData(0, 10);
            }
        });

        window.comp = this;
    }

    loadData(skip: number, take: number, sortField: string = "", sortDirection: string = "asc") {
        this.loading = true;
        this.loadGridData(skip, take, sortField, sortDirection);
    }

    ngOnInit(): void {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
    }

    ngOnDestroy(): void {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        this.routerEventsSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        merge(this.sort.sortChange, this.paginator.page).subscribe(async () => {
            const skip = this.paginator.pageIndex * this.paginator.pageSize;
            const take = this.paginator.pageSize;
            await this.loadData(skip, take, this.sort.active, this.sort.direction);
        });
    }

    loadGridData(skip: number, take: number, sortField: string = "", sortDirection: string = "asc"): any {
        const entityMetadataPromise = this.tweezCache.getEntityMetadata(this.refLink).then((res) => {
            window.grid = this;
            this.headers = {};
            this.propertyData = {};

            if (res) {
                this.gridName = res.displayNames.pluralName;
                this.iconName = res.icon;
                this.titleModule.setTitle(`${this.gridName} - Tweezers UI`);
                const keys = Object.keys(res.fields);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const field = res.fields[key];
                    if (field.fieldProperties.gridIgnore) {
                        continue;
                    }

                    const name = field.fieldProperties.name;
                    const displayName = field.fieldProperties.displayName;
                    const type = field.fieldProperties.fieldType;
                    const suffix = field.fieldProperties.numericSuffix;

                    this.propertyData[name] = {
                        displayName,
                        type,
                        suffix
                    };

                    this.idFieldName = "_id";
                    this.headers[name] = displayName;
                }

                this.valid = true;
            } else {
                this.valid = false;
            }
            this.fields = Object.keys(this.headers);
            this.displayedColumns = this.fields.filter(f => f !== this.idFieldName);
        });

        const entitiesPromise = this.tweezApi.getEntities(`${this.refLink}?sortField=${sortField}&direction=${sortDirection}&skip=${skip}&take=${take}`)
            .then((res) => {
                this.entities = res.items;
                this.totalLength = res.count;
            });

        Promise.all([entitiesPromise, entityMetadataPromise]).then((res) => {
            this.loading = false;
        });
    }

    clickItem(item: any) {
        this.router.navigate([this.refLink, item[this.idFieldName]]);
    }

    stringify(item: any, field: string) {
        if (!item[field]) {
            return "";
        }

        const suffix = !!this.propertyData[field].suffix ? ` ${this.propertyData[field].suffix}` : "";
        return `${item[field]}${suffix}`;
    }

    onAddItemClicked() {
        this.router.navigate([this.refLink, "newItem"], {queryParams: {newItem: true}});
    }
}
