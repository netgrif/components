import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        ToolbarComponent,
        FlexLayoutModule
    ],
    providers: [TranslateService, TranslatePipe, TranslateStore]
})
export class ToolbarModule {
}
