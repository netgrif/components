import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TabCreationDetectorComponent} from './tab-creation-detector.component';
import {Component, NgModule, OnInit} from '@angular/core';
import {TabContent} from '../interfaces';
import {TabGroup} from '../classes/tab-group';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
describe('TabCreationDetectorComponent', () => {
    let component: TabCreationDetectorComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TabTestModule,
                BrowserAnimationsModule
            ],
            declarations: [
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
    template: '<nae-tab-creation-detector [initializeTabFunction]="initializeTabLambda" [tabIndex]="0"></nae-tab-creation-detector>'
})
class TestWrapperComponent implements OnInit {
    tabGroup: TabGroup;
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
    initializeTabLambda = (index: number) => {
        this.tabGroup.initializeTab(index);
    }

    ngOnInit(): void {
        this.tabGroup = new TabGroup(this.tabs);
    }
}

@Component({
    selector: 'nae-test-div',
    template: '<div></div>'
})
class TestComponent {
}

@NgModule({
    declarations: [TestComponent],
    entryComponents: [TestComponent]
})
class TabTestModule {
}
