import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './services/authentication-interceptor';
import {AuthenticationEffects} from './store/effects/authentication.effects';
import {StoreModule} from '@ngrx/store';
import * as fromAuthentication from './store/reducers/authentication.redurcers';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature(fromAuthentication.AUTHENTICATION_FEATURE_KEY, fromAuthentication.reducer),
        EffectsModule.forFeature([AuthenticationEffects])
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
        AuthenticationEffects
    ]
})
export class AuthenticationModule {
}
