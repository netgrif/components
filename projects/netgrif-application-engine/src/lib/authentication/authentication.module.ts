import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './services/authentication-interceptor';
import {authenticationServiceFactory} from './authentication.factory';
import {ConfigurationService} from '../configuration/configuration.service';
import {AuthenticationMethodService} from './services/authentication-method.service';
import {AuthenticationOverlayComponent} from './components/authentication-overlay/authentication-overlay.component';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';


@NgModule({
    declarations: [AuthenticationOverlayComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        OverlayModule,
        // StoreModule.forFeature(AUTHENTICATION_FEATURE_KEY, reducer),
        // EffectsModule.forFeature([AuthenticationEffects]),
        // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
    ],
    exports: [
        AuthenticationOverlayComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
        {provide: AuthenticationMethodService, useFactory: authenticationServiceFactory, deps: [ConfigurationService, HttpClient]},
        // AuthenticationEffects
    ],
    entryComponents: [MatSpinner]
})
export class AuthenticationModule {
}
