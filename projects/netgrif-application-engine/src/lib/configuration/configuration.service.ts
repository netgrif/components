import {NetgrifApplicationEngine} from "./interfaces/schema";
import {Observable, of} from "rxjs";

export abstract class ConfigurationService {

    protected constructor (private configuration: NetgrifApplicationEngine) {
    }

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
