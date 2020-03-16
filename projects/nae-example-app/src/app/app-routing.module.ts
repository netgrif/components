import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {DrawerControlsComponent} from './drawer-prototype/drawer-controls/drawer-controls.component';
import {RailControlsComponent} from './drawer-prototype/rail-controls/rail-controls.component';


const routes: Routes = [
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'drawer', component: DrawerControlsComponent},
    {path: 'rail', component: RailControlsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
