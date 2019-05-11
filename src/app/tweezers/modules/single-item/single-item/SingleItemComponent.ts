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
    itemBackup: any;
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
        }, {
            label: "Discard",
            icon: "settings_backup_restore",
            clickFunction: this.discard.bind(this)
        }
    ];

    constructor(protected tweezApi: TweezersApi, protected tweezCache: TweezersCache, protected router: Router,
        protected titleModule: Title, protected route: ActivatedRoute) {
        super(tweezCache, tweezApi, router, titleModule);
        this.route.queryParamMap.subscribe(params => {
            this.newItem = params.get('newItem') === 'true';
            // Sync problems will be solved if calling the event subscription from the params one.
            this.routerEventsSubscription = this.router.events.subscribe(ev => {
                if (ev instanceof NavigationEnd && !this.loading) {
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
                    displayName: res.displayNames.pluralName,
                    singleName: res.displayNames.singularName,
                    iconName: res.icon,
                    refLink: `/${this.tweezApi.getBaseLinkKey(this.router.url)}`
                };
                
                this.fields = Object.keys(res.fields);
                this.fields.forEach(key => {
                    const field = res.fields[key];
                    console.log(field);
                    const name = field.name;
                    const displayName = field.displayName;
                    const type = field.fieldProperties.fieldType;
                    const values = field.fieldProperties.possibleValues;
                    const required = field.fieldProperties.required;
                    
                    this.propertyData[name] = {
                        displayName,
                        type,
                        values,
                        required
                    };
                });

                this.entityData.idField = "_id";
                this.entityData.uiTitle = this.fields.find(f => res.fields[f].fieldProperties.uiTitle);
                this.afterMetadataInit();
                console.log("data", this.propertyData);
            }
        });
        promises.push(metadataPromise);

        Promise.all(promises).then((res) => {
            window.item = this.item;
            window.component = this;

            if (this.newItem) {
                this.item = {};
                this.item[this.entityData.uiTitle] = `New ${this.entityData.singleName}`;
            } else {
                console.log("hello");
                this.buttons.push({
                    label: "Delete",
                    icon: "delete",
                    clickFunction: this.delete.bind(this)
                });
            }

            this.itemBackup = _.cloneDeep(this.item);
            this.loading = false;
            this.routerEventsSubscription.unsubscribe();
        });
    }

    save() {
        const saveItem = _.cloneDeep(this.item);
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

    discard() {
        this.item = _.cloneDeep(this.itemBackup);
        window.item = this.item;
        console.log(this.item);
    }

    protected afterMetadataInit() {
        
    }
}