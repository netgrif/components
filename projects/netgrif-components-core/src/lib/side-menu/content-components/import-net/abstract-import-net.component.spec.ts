import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {Observable, of, Subject} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource.service';
import {SideMenuControl} from '../../models/side-menu-control';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {ErrorSnackBarComponent} from '../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {Component, Inject} from '@angular/core';
import {AbstractImportNetComponent} from './abstract-import-net.component';
import {LoggerService} from '../../../logger/services/logger.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateService} from '@ngx-translate/core';
import {EventOutcomeMessageResource} from '../../../resources/interface/message-resource';
import {ImportPetriNetEventOutcome} from '../../../event/model/event-outcomes/petrinet-outcomes/import-petri-net-event-outcome';
import {createMockNet} from '../../../utility/tests/utility/create-mock-net';
import {UriService} from "../../../navigation/service/uri.service";
import {AuthenticationModule} from "../../../authentication/authentication.module";
import {UriResourceService} from "../../../navigation/service/uri-resource.service";
import {MockUriResourceService} from "../../../utility/tests/mocks/mock-uri-resource.service";

describe('AbstractImportNetComponent', () => {
    let component: TestImportComponent;
    let fixture: ComponentFixture<TestImportComponent>;
    let sideMenuCloseSpy: jasmine.Spy;
    let logSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                AuthenticationModule,
                TranslateLibModule,
                MatIconModule,
                SnackBarModule
            ],
            providers: [{
                provide: NAE_SIDE_MENU_CONTROL,
                useValue: new SideMenuControl(() => {}, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: UriResourceService, useClass: MockUriResourceService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource},
                UriService,
                TranslateService
            ],
            declarations: [TestImportComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestImportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        sideMenuCloseSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'close');
        logSpy = spyOn(TestBed.inject(LoggerService), 'info');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test functions', () => {
        component.onProcessFileChosen();
        component.retryFile({
            data: new File([], 'name'),  stringId: '', downloading: false,
            inProgress: false, progress: 0, completed: true,
        });
        component.cancelFile({
            data: new File([], 'name'), stringId: '', downloading: false,
            inProgress: false, progress: 0, completed: true, sub: new Subject().subscribe()
        });
        component.close();
        expect(sideMenuCloseSpy).toHaveBeenCalled();
    });

    afterEach(() => {
        logSpy.calls.reset();
        sideMenuCloseSpy.calls.reset();
        TestBed.resetTestingModule();
    });
});

class MyPetriNetResource {
    importPetriNet(file): Observable<EventOutcomeMessageResource> {
        return of({
            success: 'success',
            outcome: {
                net: createMockNet(),
                outcomes: [],
                message: ''
            } as ImportPetriNetEventOutcome
        });
    }
}

@Component({
    selector: 'ncc-test-import',
    template: '<input type="file" id="sidemenu-fileUpload" name="fileUpload" multiple="multiple" accept="text/xml"/>'
})
class TestImportComponent extends AbstractImportNetComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _petriNetResource: PetriNetResourceService,
                protected _uriService: UriService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        super(_sideMenuControl, _petriNetResource,  _uriService, _log, _snackbar, _translate);
    }
}
