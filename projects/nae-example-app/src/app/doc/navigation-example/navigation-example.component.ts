import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'nae-app-navigation-example',
    templateUrl: './navigation-example.component.html',
    styleUrls: ['./navigation-example.component.scss'],
    standalone: false
})
export class NavigationExampleComponent implements OnInit {
    public viewPath: string;
    public parentUrl: string;

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (event.url === '/navigation-test') {
                    this.viewPath = 'demo-navigation-test';
                    this.parentUrl = '/navigation-test';
                } else  if (event.url === '/navigation-test/one') {
                    this.viewPath = 'demo-navigation-test/one';
                    this.parentUrl = '/navigation-test/one';
                } else  if (event.url === '/navigation-test/two') {
                    this.viewPath = 'demo-navigation-test/two';
                    this.parentUrl = '/navigation-test/two';
                }
            }
        });
        // this.viewPath = 'demo-navigation-test';
        // this.parentUrl = '/navigation-test';
    }

    ngOnInit(): void {
    }

}
