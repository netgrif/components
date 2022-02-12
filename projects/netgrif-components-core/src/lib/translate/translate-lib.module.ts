import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageService} from './language.service';
import {TranslateInterceptor} from './translate-interceptor';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    exports: [TranslateModule],
    providers: [
        TranslateService,
        TranslatePipe,
        TranslateStore,
        LanguageService,
        {provide: HTTP_INTERCEPTORS, useClass: TranslateInterceptor, multi: true},
    ]
})
export class TranslateLibModule {
}
