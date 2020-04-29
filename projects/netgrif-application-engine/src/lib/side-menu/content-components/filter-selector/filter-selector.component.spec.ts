import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterSelectorComponent} from './filter-selector.component';
import {SideMenuFilterSelectorModule} from './side-menu-filter-selector.module';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {SimpleFilter} from '../../../filter/models/simple-filter';
import {FilterType} from '../../../filter/models/filter-type';
import {MatSelectionListChange} from '@angular/material';

describe('FilterSelectorComponent', () => {
    let component: FilterSelectorComponent;
    let fixture: ComponentFixture<FilterSelectorComponent>;
    let sideMenuSpy: jasmine.Spy;
    let sideMenuCloseSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuFilterSelectorModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            declarations: [],
            providers: [
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(() => {}, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        sideMenuSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'publish');
        sideMenuCloseSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'close');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test functions', () => {
        component.filterFilters('');
        component.caseFilterSelected({option: {selected: undefined}} as MatSelectionListChange);
        component.taskFilterSelected({option: {selected: undefined}} as MatSelectionListChange);

        component.filterSelected(new SimpleFilter('', FilterType.TASK, {}));
        expect(sideMenuSpy).toHaveBeenCalled();

        component.filterSelectionConfirmed();
        expect(sideMenuCloseSpy).toHaveBeenCalled();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

