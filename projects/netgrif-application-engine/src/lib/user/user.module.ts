import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromUser from './store/reducers/user.reducers';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {UserEffects} from "./store/effects/user.effects";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        // StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducer),
        // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
        // EffectsModule.forFeature([UserEffects])
    ],
    providers: []

})
export class UserModule {
}
