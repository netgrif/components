import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TabCreationDetectorComponent} from './tab-creation-detector.component';
import {Component, NgModule, OnInit} from '@angular/core';
import {TabContent} from '../interfaces';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TabView} from '../classes/tab-view';
import {ViewService} from '../../routing/view-service/view.service';
import {LoggerService} from '../../logger/services/logger.service';

describe('TabCreationDetectorComponent', () => {
    let component: TabCreationDetectorComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TabTestModule,
                NoopAnimationsModule
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-tab-creation-detector [initializeTabFunction]="initializeTabLambda" [tabIndex]="0"></nae-tab-creation-detector>'
})
class TestWrapperComponent implements OnInit {
    tabGroup: TabView;
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

    constructor(private viewService: ViewService, private logger: LoggerService) {
    }

    ngOnInit(): void {
        this.tabGroup = new TabView(this.viewService, this.logger, this.tabs);
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
