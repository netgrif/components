import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {PanelExampleComponent} from './doc/panel-example/panel-example.component';

const routes: Routes = [
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'panel', component: PanelExampleComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
