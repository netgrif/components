import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TabViewComponent} from './tab-view.component';
import {MaterialModule} from '../../material/material.module';
import {TabCreationDetectorComponent} from '../tab-creation-detector/tab-creation-detector.component';
import {Component, NgModule} from '@angular/core';
import {TabContent} from '../interfaces';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AbstractTabComponent', () => {
    let component: TabViewComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, TabTestModule, BrowserAnimationsModule],
            declarations: [TabViewComponent,
                TabCreationDetectorComponent,
                TestWrapperComponent,
            ]
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
    template: '<nae-tab-view [initialTabs]="tabs"></nae-tab-view>'
})
class TestWrapperComponent {
    tabs: Array<TabContent> = [
        {
            label: {
                text: 'tab title',
                icon: 'home'
            },
            canBeClosed: false,
            tabContentComponent: TestComponent
        }
    ];
}

@Component({
    selector: 'nae-test-div',
    template: '<div></div>'
})
class TestComponent {}

@NgModule({
    declarations: [TestComponent],
    entryComponents: [TestComponent]
})
class TabTestModule { }




