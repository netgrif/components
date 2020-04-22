import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {Observable, of} from 'rxjs';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {SideMenuImportNetModule} from './side-menu-import-net.module';
import {ImportNetComponent} from './import-net.component';
import {PetriNetResourceService} from '../../../resources/engine-endpoint/petri-net-resource-service';

describe('ImportNetComponent', () => {
    let component: ImportNetComponent;
    let fixture: ComponentFixture<ImportNetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SideMenuImportNetModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            declarations: [],
            providers: [{
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(() => {}, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportNetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should test functions', () => {
        component.onProcessFileChosen();
        component.retryFile({
            data: new File([], 'name'), state: 'in', stringId: '', downloading: false,
            inProgress: false, progress: 0, canRetry: false, canCancel: true, successfullyUploaded: false
        });
    });
});

class MyPetriNetResource {
    importPetriNet(file) {
       return of({success: 'success'});
    }
}

