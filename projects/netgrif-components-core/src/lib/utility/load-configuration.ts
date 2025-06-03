import {ConfigurationService} from '../configuration/configuration.service';


export function loadConfiguration(configurationService: ConfigurationService): () => Promise<any> | void {
    return (): Promise<any> => {
        return configurationService.loadConfiguration();
    }
}
