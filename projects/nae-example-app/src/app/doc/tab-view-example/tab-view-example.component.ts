import {Component, OnInit} from '@angular/core';
import {TabContent} from '@netgrif/application-engine';
import {ContentComponent} from './content/content.component';

@Component({
    selector: 'nae-app-tab-view-example',
    templateUrl: './tab-view-example.component.html',
    styleUrls: ['./tab-view-example.component.scss']
})
export class TabViewExampleComponent implements OnInit {
    readonly TITLE = 'Tab View';
    readonly DESCRIPTION = 'Ukážka použitia Tab view...';

    tabs: Array<TabContent> = [
        {
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeDeleted: false,
            tabContentComponent: ContentComponent
        },
        {
            label: {
                text: 'injected data',
                icon: 'nature'
            },
            canBeDeleted: false,
            tabContentComponent: ContentComponent,
            injectedObject: {
                text: 'I am injected'
            }
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
