// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    resolve_configuration:  window['env']?.['resolve_configuration'] || false,
    gateway_url:  window['env']?.['gateway_url'] || 'http://localhost:8800/api',
    application_identifier: window['env']?.['application_identifier'] || 'nae',
    type_identifier: window['env']?.['type_identifier'] || 'default'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
