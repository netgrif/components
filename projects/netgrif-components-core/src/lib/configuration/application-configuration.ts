import {NetgrifApplicationEngine} from '../../commons/schema';

/**
 * Interface representing the configuration settings for an application.
 * This configuration defines the essential properties required to initialize
 * or operate an application within a specific context or environment.
 *
 * @interface ApplicationConfiguration
 *
 * @property application
 * Specifies the name or identifier of the application.
 *
 * @property type
 * Indicates the type or category of the application.
 *
 * @property [resolve_configuration]
 * Optional flag that determines whether the configuration should
 * be resolved dynamically.
 *
 * @property [gateway_url]
 * Optional URL used as the gateway endpoint for the application's communication.
 *
 * @property [properties]
 * Properties of the application representing the whole application configuration
 * that is typically located inside nae.json.
 */
export interface ApplicationConfiguration {
    application: string;
    type: string;
    resolve_configuration?: boolean;
    gateway_url?: string;
    properties?: NetgrifApplicationEngine;
}

export async function loadRemoteConfiguration(env: any): Promise<any> {
    if (!window['env'] || !window['env']['resolve_configuration']) {
        console.log('Remote configuration not enabled.');
        return env;
    }

    const remoteConfigUrl = `${env.gateway_url}/frontend-config/public/${env.application_identifier}/${env.type_identifier}`;
    const response = await fetch(remoteConfigUrl);
    if (!response.ok) {
        console.error('Error loading remote configuration configuration', response);
    } else {
        env.loaded_properties = await response.json();
    }
    return env;
}
