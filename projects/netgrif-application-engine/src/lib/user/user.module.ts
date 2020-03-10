import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationModule} from "../authentication/authentication.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        // StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.reducer),
        // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
        // EffectsModule.forFeature([UserEffects])
        AuthenticationModule
    ],
    providers: []

})
export class UserModule {
}
