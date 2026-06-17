import {ConfigurationService} from '../configuration/configuration.service';
import {Observable} from 'rxjs';

/**
 * Factory function that creates a configuration loader for application initialization.
 * This function serves as an APP_INITIALIZER provider factory to load configuration
 * before the application bootstrap completes.
 *
 * @param configurationService - Injectable service handling configuration loading and management
 * @returns A function that returns an Observable which resolves when configuration is loaded
 * @throws {Error} When configuration service fails to load required configuration
 * @example
 * ```typescript
 * providers: [
 *   {
 *     provide: APP_INITIALIZER,
 *     useFactory: loadConfiguration,
 *     deps: [ConfigurationService],
 *     multi: true
 *   }
 * ]
 * ```
 */
export function loadConfiguration(configurationService: ConfigurationService): () => Observable<any> {
    return (): Observable<any> => {
        return configurationService.loadConfiguration();
    }
}
