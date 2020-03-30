import { Injectable } from '@angular/core';
import {ConfigurationService} from '@netgrif/application-engine';

@Injectable({
    providedIn: 'root'
})
export class NaeExampleAppConfigurationService extends ConfigurationService {

    constructor() {
        super({
            extends: 'nae-default',
            providers: {
                auth: {
                    address: 'https://backend.com/auth',
                    authentication: 'Basic',
                    endpoints: {
                        login: 'http://localhost:8080/api/auth/login',
                        logout: 'http://localhost:8080/api/auth/logout',
                        signup: 'http://localhost:8080/api/auth/signup'
                    },
                    sessionBearer: 'x-auth-token'
                },
                resources: [
                    {
                        name: 'backend',
                        address: 'http://localhost:8080/api/',
                        format: 'json'
                    }
                ]
            },
            theme: {
                name: 'example-classico',
                pallets: {
                    light: {
                        primary: {
                            50: '',
                            100: '',
                            200: '',
                            300: '',
                            400: '',
                            500: '',
                            600: '',
                            700: '',
                            800: '',
                            900: '',
                            A100: '',
                            A200: '',
                            A400: '',
                            A700: '',
                            contrast: {
                                light: [
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900'
                                ],
                                dark: [
                                    '50',
                                    '100',
                                    '200'
                                ]
                            }
                        },
                        secondary: {
                            50: '',
                            100: '',
                            200: '',
                            300: '',
                            400: '',
                            500: '',
                            600: '',
                            700: '',
                            800: '',
                            900: '',
                            A100: '',
                            A200: '',
                            A400: '',
                            A700: '',
                            contrast: {
                                light: [
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900'
                                ],
                                dark: [
                                    '50',
                                    '100',
                                    '200'
                                ]
                            }
                        },
                        warn: {
                            50: '',
                            100: '',
                            200: '',
                            300: '',
                            400: '',
                            500: '',
                            600: '',
                            700: '',
                            800: '',
                            900: '',
                            A100: '',
                            A200: '',
                            A400: '',
                            A700: '',
                            contrast: {
                                light: [
                                    '300',
                                    '400',
                                    '500',
                                    '600',
                                    '700',
                                    '800',
                                    '900'
                                ],
                                dark: [
                                    '50',
                                    '100',
                                    '200'
                                ]
                            }
                        }
                    },
                    dark: {}
                }
            },
            assets: [
                '../../../assets'
            ],
            filters: {
                'all-cases': {
                    title: 'All Cases',
                    access: 'public',
                    query: 'select * from case where title like ${some-param}'
                }
            },
            i18n: [
                'sk-SK',
                'en-US'
            ],
            views: {
                layout: 'empty',
                routes: {}
            },
            defaults: {
                log: {
                    level: 'INFO',
                    logWithDate: true,
                    serializeExtraParams: true,
                    includeLogLevel: true,
                    publishers: [
                        'console'
                    ]
                }
            }
        });
    }
}
