import {Injectable} from '@angular/core';
import {NetgrifApplicationEngine} from "./interfaces/schema";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    protected configuration: NetgrifApplicationEngine;

    public getAsync(): Observable<NetgrifApplicationEngine> {
        return of(this.get());
    }

    public get(): NetgrifApplicationEngine {
        return this.createConfigurationCopy();
    }

    private createConfigurationCopy(): any {
        return JSON.parse(JSON.stringify(this.configuration));
    }
}
