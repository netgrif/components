import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './services/authentication-interceptor';
import {authenticationServiceFactory} from './authentication.factory';
import {ConfigurationService} from '../configuration/configuration.service';
import {AuthenticationMethodService} from './services/authentication-method.service';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import {AnonymousAuthenticationInterceptor} from './services/anonymous-authentication-interceptor';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        OverlayModule,
        // StoreModule.forFeature(AUTHENTICATION_FEATURE_KEY, reducer),
        // EffectsModule.forFeature([AuthenticationEffects]),
        // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AnonymousAuthenticationInterceptor, multi: true },
        { provide: AuthenticationMethodService, useFactory: authenticationServiceFactory, deps: [ConfigurationService, HttpClient] },
        // AuthenticationEffects
    ]
})
export class AuthenticationModule {
}
