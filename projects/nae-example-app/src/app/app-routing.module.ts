import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';


const routes: Routes = [
    {path: 'authentication', component: AuthenticationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
