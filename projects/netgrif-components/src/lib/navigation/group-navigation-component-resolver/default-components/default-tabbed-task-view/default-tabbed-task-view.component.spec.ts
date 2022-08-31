import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DefaultTabbedTaskViewComponent} from './default-tabbed-task-view.component';
import {NavigationComponentModule} from '../../../navigation.module';
import {NAE_TAB_DATA, OverflowService, SimpleFilter, TestMockDependenciesModule} from '@netgrif/components-core';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';

describe('DefaultTabbedTaskViewComponent', () => {
    let component: DefaultTabbedTaskViewComponent;
    let fixture: ComponentFixture<DefaultTabbedTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                OverflowService,
                {
                    provide: NAE_TAB_DATA,
                    useValue: {
                        baseFilter: SimpleFilter.emptyTaskFilter(),
                        allowedNets: [],
                        tabUniqueId: '1',
                        tabSelected$: of(true),
                        tabClosed$: of()
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTabbedTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
