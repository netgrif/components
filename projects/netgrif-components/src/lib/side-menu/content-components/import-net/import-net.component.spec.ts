import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {SideMenuImportNetComponentModule} from './side-menu-import-net-component.module';
import {ImportNetComponent} from './import-net.component';
import {
    AuthenticationModule,
    ConfigurationService,
    NAE_SIDE_MENU_CONTROL,
    PetriNetResourceService,
    SideMenuControl,
    SnackBarModule,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {MatIconModule} from '@angular/material/icon';
import {RouterTestingModule} from "@angular/router/testing";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('ImportNetComponent', () => {
    let component: ImportNetComponent;
    let fixture: ComponentFixture<ImportNetComponent>;
    let sideMenuCloseSpy: jasmine.Spy;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuImportNetComponentModule,
                AuthenticationModule,
                TranslateLibModule,
                MatIconModule,
                SnackBarModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [{
                provide: NAE_SIDE_MENU_CONTROL,
                useValue: new SideMenuControl(() => {
                }, new Observable<boolean>(), null)
            },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
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

