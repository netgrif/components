import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule
} from "@angular/material";
import {RouterModule, Routes} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    LoggerModule,
    LoginCardComponent,
    ForgottenPasswordCardComponent
} from '@netgrif/application-engine';
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

export const routes: Routes = [
    {path: 'login component', component: LoginCardComponent},
    {path: 'forgotten password component', component: ForgottenPasswordCardComponent},
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LoggerModule,
        MatButtonModule,
        RouterModule.forRoot(routes),
        MatSidenavModule,
        MatListModule,
        FlexLayoutModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
