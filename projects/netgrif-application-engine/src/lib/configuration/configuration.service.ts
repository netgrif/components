import {Injectable} from '@angular/core';
import {NetgrifApplicationEngine} from "./interfaces/schema";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    private configuration: NetgrifApplicationEngine;

    public getAsync(configurationPath?: string): Observable<any> {
        return of(this.get(configurationPath));
    }

    public get(configurationPath?: string): any {
        if (configurationPath === undefined) {
           return ConfigurationService.createCopy(this.configuration);
        }

        let currentNode = this.configuration;
        for(let pathPart of configurationPath.split(/[.\[]/)) {
            if (pathPart.endsWith(']')) {
               pathPart = pathPart.substring(0, pathPart.length - 2);
            }
            currentNode = currentNode[pathPart];
            if (currentNode === undefined) {
                return undefined;
            }
        }

        return ConfigurationService.createCopy(currentNode);
    }

    private static createCopy(configurationPart: any): any {
        return JSON.parse(JSON.stringify(configurationPart));
    }
}
