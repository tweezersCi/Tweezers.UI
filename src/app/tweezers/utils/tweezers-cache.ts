import { Injectable } from "@angular/core";
import { TweezersApi } from './tweezers-api';
import { ClassBaseMetadata } from '../interfaces/class-base-metadata';
import { ClassMetadata } from '../interfaces/class-metadata';

@Injectable({
    providedIn: 'root'
})
export class TweezersCache {
    private classMetadata: ClassBaseMetadata[];
    private entityMetadataCache: any = {};

    constructor(private api: TweezersApi) {
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.api.discoverBaseEntities().then(data => this.classMetadata = data);
    }

    async getClassMetadata(): Promise<ClassBaseMetadata[]>{
        if (!this.classMetadata) {
            this.classMetadata = await this.api.discoverBaseEntities();
        }
            
        return Promise.resolve(this.classMetadata);
    }

    async getEntityMetadata(refLink: string): Promise<ClassMetadata> {
        const refLinkKey = this.api.getBaseLinkKey(refLink);
        if (!this.entityMetadataCache || !this.entityMetadataCache[refLinkKey]) {
            const refLinkBaseUrl = `/${refLinkKey}`;
            console.log("base", refLinkBaseUrl);
            this.entityMetadataCache[refLinkKey] = await this.api.getEntityMetadata(refLinkBaseUrl);
        }

        return Promise.resolve(this.entityMetadataCache[refLinkKey]);
    }
}