import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable, of, Subject} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SideMenuImportNetComponentModule} from './side-menu-import-net-component.module';
import {ImportNetComponent} from './import-net.component';
import {
    TranslateLibModule,
    ConfigurationService,
    TestConfigurationService,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    PetriNetResourceService,
    ErrorSnackBarComponent,
    SuccessSnackBarComponent,
} from '@netgrif/application-engine';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatIconModule} from '@angular/material/icon';

describe('ImportNetComponent', () => {
    let component: ImportNetComponent;
    let fixture: ComponentFixture<ImportNetComponent>;
    let sideMenuCloseSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuImportNetComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                TranslateLibModule,
                MatIconModule,
            ],
            providers: [{
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(() => {}, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource}
            ],
            declarations: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportNetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        sideMenuCloseSpy = spyOn(TestBed.inject(NAE_SIDE_MENU_CONTROL), 'close');
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

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

class MyPetriNetResource {
    importPetriNet(file) {
       return of({success: 'success'});
    }
}

