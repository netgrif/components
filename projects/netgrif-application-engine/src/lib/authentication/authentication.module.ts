import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './services/authentication-interceptor';
import {authenticationServiceFactory} from './authentication.factory';
import {ConfigurationService} from '../configuration/configuration.service';
import {AuthenticationMethodService} from './services/authentication-method.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
        // StoreModule.forFeature(AUTHENTICATION_FEATURE_KEY, reducer),
        // EffectsModule.forFeature([AuthenticationEffects])
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
        {provide: AuthenticationMethodService, useFactory: authenticationServiceFactory, deps: [ConfigurationService, HttpClient]},
        // AuthenticationEffects
    ]
})
export class AuthenticationModule {
}
