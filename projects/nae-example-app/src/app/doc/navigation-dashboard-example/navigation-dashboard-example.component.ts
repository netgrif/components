import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'nae-app-navigation-dashboard-example',
  templateUrl: './navigation-dashboard-example.component.html',
  styleUrls: ['./navigation-dashboard-example.component.scss']
})
export class NavigationDashboardExampleComponent {

  constructor() {}

}
