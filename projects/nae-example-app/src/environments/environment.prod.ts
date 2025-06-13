export const environment = {
    production: true,
    resolve_configuration: window['env']['resolve_configuration'] || false,
    gateway_url: window['env']['gateway_url'] || 'http://localhost:8800/api',
    application_identifier: window['env']['application_identifier'] || 'nae',
    type_identifier: window['env']['type_identifier'] || 'default'
};
