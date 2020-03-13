import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TabGroupComponent} from './tab-group.component';
import {MaterialModule} from '../../material/material.module';
import {TabCreationDetectorComponent} from '../tab-creation-detector/tab-creation-detector.component';
import {Component} from '@angular/core';
import {TabContent} from '@netgrif/application-engine';
import {ContentComponent} from '../../../../../nae-example-app/src/app/doc/tab-view-example/content/content.component';

describe('AbstractTabComponent', () => {
    let component: TabGroupComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
            declarations: [TabGroupComponent,
                TabCreationDetectorComponent,
                TestWrapperComponent]
        })
        .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-tab-group [initialTabs]="tabs"></nae-tab-group>'
})
class TestWrapperComponent {
    tabs: Array<TabContent> = [
        {
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeDeleted: false,
            tabContentComponent: TestWrapperComponent // https://stackoverflow.com/questions/41689468/how-to-shallow-test-a-component-with-an-entrycomponents
        }
    ];
}

