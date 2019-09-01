import { Injectable } from "@angular/core";
import { TweezersApi } from "./tweezers-api";
import { ClassMetadata } from "../interfaces/class-metadata";

@Injectable({
    providedIn: "root"
})
export class TweezersCache {
    private metadata: any;
    private classMetadata: any;

    constructor(private api: TweezersApi) {
    }

    ngOnInit(): void {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        this.api.discoverBaseEntities().then(data => this.classMetadata = data);
    }

    async getGeneralMetadata(): Promise<any> {
        if (!this.metadata) {
            this.metadata = await this.api.getGeneralMetadata();
        }

        return Promise.resolve(this.metadata);
    }

    async getClassMetadata(force: boolean): Promise<any> {
        if (!this.classMetadata || force) {
            this.classMetadata = await this.api.discoverBaseEntities();
        }

        return Promise.resolve(this.classMetadata);
    }

    async getEntityMetadata(refLink: string): Promise<any> {
        const refLinkKey = this.api.getBaseLinkKey(refLink);
        const myClassMetadata = await this.api.getEntityMetadata(refLinkKey);

        return Promise.resolve(myClassMetadata);
    }
}
