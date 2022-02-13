import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SideMenuImportNetComponentModule} from './side-menu-import-net-component.module';
import {ImportNetComponent} from './import-net.component';
import {
    ConfigurationService,
    ErrorSnackBarComponent,
    NAE_SIDE_MENU_CONTROL,
    PetriNetResourceService,
    SideMenuControl,
    SnackBarModule,
    SuccessSnackBarComponent,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatIconModule} from '@angular/material/icon';

describe('ImportNetComponent', () => {
    let component: ImportNetComponent;
    let fixture: ComponentFixture<ImportNetComponent>;
    let sideMenuCloseSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuImportNetComponentModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                TranslateLibModule,
                MatIconModule,
                SnackBarModule
            ],
            providers: [{
                provide: NAE_SIDE_MENU_CONTROL,
                useValue: new SideMenuControl(() => {
                }, new Observable<boolean>(), null)
            },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource}
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

class MyPetriNetResource {
    importPetriNet(file) {
        return of({success: 'success'});
    }
}

