import {ConfigurationService} from '../configuration/configuration.service';


/**
 * Loads the configuration from admin node using the provided configuration service.
 *
 * @param {ConfigurationService} configurationService - The service responsible for loading the configuration.
 * @return {Function} - A function that, when called, returns a Promise resolving to the loaded configuration or void.
 */
export function loadConfiguration(configurationService: ConfigurationService): () => Promise<any> | void {
    return (): Promise<any> => {
        return configurationService.loadConfiguration();
    }
}
