import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TweezersApi } from 'src/app/tweezers/utils/tweezers-api';
import { TweezersCache } from 'src/app/tweezers/utils/tweezers-cache';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BaseComponent } from '../../base-component/BaseComponent';
import { TweezersButton } from 'src/app/tweezers/interfaces/tweezers-button';
import * as _ from 'lodash';

declare let window;

@Component({
    selector: 'tweezers-single-item',
    templateUrl: "single-item.component.html",
    styleUrls: ["single-item.component.css"],
})
export class SingleItemComponent extends BaseComponent {
    loading: boolean;
    item: any;
    itemUrl: string;
    routerEventsSubscription: Subscription;
    propertyData: any;
    entityData: any;
    fields: string[];
    newItem: boolean;

    buttons: TweezersButton[] = [
        {
            label: "Save",
            icon: "save",
            clickFunction: this.save.bind(this)
        }
    ];

    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title, private route: ActivatedRoute) {
        super(tweezCache, tweezApi, router, titleModule);
        this.route.queryParamMap.subscribe(params => {
            this.newItem = params.get('newItem') === 'true';
            // Sync problems will be solved if calling the event subscription from the params one.
            this.routerEventsSubscription = this.router.events.subscribe(ev => {
                if (ev instanceof NavigationEnd) {
                    this.loading = true;
                    this.loadData(ev.url);
                }
            });
        });
        window.component = this;
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.routerEventsSubscription.unsubscribe();
    }

    loadData(url: string): any {
        this.itemUrl = url;
        const promises = [];
        if (!this.newItem) {
            const entityPromise = this.tweezApi.getEntity(url).then((res) => {
                if (res) {
                    this.item = res;
                    this.titleModule.setTitle(`${this.item.name} - Tweezers UI`);
                }
            });
            promises.push(entityPromise);
        }

        const metadataPromise = this.tweezCache.getEntityMetadata(url).then(res => {
            if (res) {
                this.propertyData = {};
                this.entityData = {
                    displayName: res.entityData.displayName,
                    iconName: res.entityData.iconName,
                    refLink: `/${this.tweezApi.getBaseLinkKey(this.router.url)}`
                };
                
                res.propertyData.forEach(pd => {
                    const name = pd.propertyName;
                    const displayName = pd.displayName;
                    const type = pd.propertyType;
                    const values = pd.values;
                    
                    if (pd.idField)
                        this.entityData.idField = name;

                    this.propertyData[name] = {
                        displayName,
                        type,
                        values
                    };
                });

                this.fields = Object.keys(this.propertyData).filter(k => k !== this.entityData.idField);
            }
        });
        promises.push(metadataPromise);

        Promise.all(promises).then((res) => {
            window.item = this.item;
            window.component = this;

            
            if (this.newItem) {
                this.item = {};
                this.item.name = `New ${this.entityData.displayName}`;
            } else {
                this.buttons.push({
                    label: "Delete",
                    icon: "delete",
                    clickFunction: this.delete.bind(this)
                });
            }

            this.loading = false;
        });
    }

    navigateToFather() {
        this.router.navigate([this.entityData.refLink]);
    }

    save() {
        const saveItem = _.clone(this.item);
        //delete saveItem[this.entityData['idField']];

        console.log("item to save", saveItem);
        console.log(this.itemUrl);
        
        this.tweezApi.saveEntity(this.itemUrl, saveItem, this.newItem).then(res => {
            console.log("saved", res);
            this.item = res;

            if (this.newItem) {
                this.router.navigate([this.entityData.refLink, this.item[this.entityData.idField]]);
            }
        });
    }

    delete() {
        this.tweezApi.deleteEntity(this.itemUrl).then(res => {
            console.log("deleted");
            this.router.navigate([this.entityData.refLink]);
        })
    }
}