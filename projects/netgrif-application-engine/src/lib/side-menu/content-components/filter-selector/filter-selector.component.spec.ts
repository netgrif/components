import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterSelectorComponent} from './filter-selector.component';
import {SideMenuFilterSelectorModule} from './side-menu-filter-selector.module';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('FilterSelectorComponent', () => {
    let component: FilterSelectorComponent;
    let fixture: ComponentFixture<FilterSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuFilterSelectorModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            declarations: [],
            providers: [{
                provide: NAE_SIDE_MENU_CONTROL,
                useValue: new SideMenuControl(() => {}, new Observable<boolean>(), null)
            }, {
                provide: ConfigurationService,
                useClass: TestConfigurationService
            }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class TestConfigurationService extends ConfigurationService {
    constructor() {
        super({assets: [], providers: undefined, theme: undefined, views: undefined});
    }
}
