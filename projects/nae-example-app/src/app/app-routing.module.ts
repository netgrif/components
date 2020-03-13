import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {UserAssignSidemenuExampleComponent} from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';


const routes: Routes = [
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'new-case-sidemenu', component: CaseSidemenuExampleComponent},
    {path: 'sidemenu', component: SidemenuExampleComponent},
    {path: 'user-assign-sidemenu', component: UserAssignSidemenuExampleComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
