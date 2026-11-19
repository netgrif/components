import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// the routes of the views are built from nae.json by RoutingBuilderService (AppComponent)
const routes: Routes = [];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
