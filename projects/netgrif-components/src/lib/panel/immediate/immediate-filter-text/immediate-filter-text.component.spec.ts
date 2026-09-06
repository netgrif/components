import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ImmediateFilterTextComponent} from './immediate-filter-text.component';
import {
    MaterialModule,
    ConfigurationService,
    TestConfigurationService, AllowedNetsService, TestNoAllowedNetsFactory, AllowedNetsServiceFactory, MockUserService,
    User, AuthenticationModule, UserService,
} from '@netgrif/components-core';
import {PanelComponentModule} from '../../panel.module';
import {Component, Injectable} from '@angular/core';
import {RouterTestingModule} from "@angular/router/testing";

describe('ImmediateFilterTextComponent', () => {
    let component: ImmediateFilterTextComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [
                MaterialModule,
                PanelComponentModule,
                AuthenticationModule,
                RouterTestingModule.withRoutes([]),
            ], providers: [
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UserService, useClass: CustomMockUserService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-immediate-filter-text [ellipsis]="true" [query]="\'cases: creationDate eq 2026-08-31\'" [type]="\'case\'" ></nc-immediate-filter-text>'
})
class TestWrapperComponent {

    constructor() {
    }
}

@Injectable()
class CustomMockUserService extends MockUserService {
    constructor() {
        super();
        this._user = new User('123', 'test@netgrif.com', 'Test', 'User', ['ROLE_USER'], [{
            stringId: 'id',
            name: 'id',
            description: '',
            importId: 'id',
            netImportId: 'identifier',
            netVersion: '1.0.0',
            netStringId: 'stringId',
        }]);
    }
}
