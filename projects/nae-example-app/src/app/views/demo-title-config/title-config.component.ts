import {Component} from '@angular/core';
import {NAE_VIEW_ID_SEGMENT, ViewIdService} from '@netgrif/components-core';
import { DemoTitleConfigContent0TaskViewComponent } from './content/0/demo-title-config-content0-task-view.component';
import { DemoTitleConfigContent1CaseViewComponent } from './content/1/demo-title-config-content1-case-view.component';
import { DemoTitleConfigContent2CaseViewComponent } from './content/2/demo-title-config-content2-case-view.component';
import { DemoTitleConfigContent3CaseViewComponent } from './content/3/demo-title-config-content3-case-view.component';


@Component({
    selector: 'nae-app-title-config',
    templateUrl: './title-config.component.html',
    styleUrls: ['./title-config.component.scss'],
    providers: [
        {   provide: NAE_VIEW_ID_SEGMENT,
            useValue: 'demo-title-config'},
        ViewIdService,
    ],
    standalone: false
})
export class TitleConfigComponent {

    tabs = [
        {
            label: {
                icon: 'storage',
                text: 'Default',
            },
            canBeClosed: false,
            tabContentComponent: DemoTitleConfigContent1CaseViewComponent,
            order: -1,
            injectedObject: {
                tabViewComponent: DemoTitleConfigContent0TaskViewComponent,
                tabViewOrder: 0
            }
        },
        {
            label: {
                icon: 'storage',
                text: 'Viac sietí, bez title',
            },
            canBeClosed: false,
            tabContentComponent: DemoTitleConfigContent2CaseViewComponent,
            order: 0,
            injectedObject: {
                tabViewComponent: DemoTitleConfigContent0TaskViewComponent,
                tabViewOrder: 0
            }
        },
        {
            label: {
                icon: 'storage',
                text: 'Jedna sieť, title optional',
            },
            canBeClosed: false,
            tabContentComponent: DemoTitleConfigContent3CaseViewComponent,
            order: 1,
            injectedObject: {
                tabViewComponent: DemoTitleConfigContent0TaskViewComponent,
                tabViewOrder: 0
            }
        },
    ];

}
