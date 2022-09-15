import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
    MaterialModule,
    TranslateLibModule,
    AuthenticationMethodService,
    MockAuthenticationMethodService,
    AuthenticationService,
    MockAuthenticationService,
    ConfigurationService,
    TestConfigurationService,
    CaseRefField,
    PetriNetResourceService,
    SnackBarModule,
    ErrorSnackBarComponent
} from '@netgrif/components-core';
import {CaseRefFieldComponent} from './case-ref-field.component';
import {AngularResizeEventModule} from 'angular-resize-event';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PetriflowCanvasModule} from '@netgrif/petriflow.svg';
import {Component} from '@angular/core';
import {of} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('CaseRefFieldComponent', () => {
    let component: CaseRefFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                AngularResizeEventModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                PetriflowCanvasModule,
                SnackBarModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource},
            ],
            declarations: [CaseRefFieldComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-case-ref-field [dataField]="field"></nc-case-ref-field>'
})
class TestWrapperComponent {
    field = new CaseRefField('', '', '', {
        required: true,
    });
}

class MyPetriNetResource {
    public getNetByCaseId(caseId: string) {
        return of({
            transitions: [],
            places: [],
            arcs: []
        });
    }
}
