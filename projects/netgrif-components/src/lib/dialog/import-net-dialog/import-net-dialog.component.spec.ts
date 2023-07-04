import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportNetDialogComponent} from './import-net-dialog.component';
import {
    SideMenuImportNetComponentModule
} from '../../side-menu/content-components/import-net/side-menu-import-net-component.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
    ConfigurationService, ErrorSnackBarComponent,
    NAE_SIDE_MENU_CONTROL, PetriNetResourceService,
    SideMenuControl,
    SnackBarModule, SuccessSnackBarComponent, TestConfigurationService,
    TranslateLibModule
} from 'netgrif-components-core';
import {MatIconModule} from '@angular/material/icon';
import {Observable, of} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AuthenticationModule} from "@netgrif/components-core";

describe('ImportNetDialogComponent', () => {
    let component: ImportNetDialogComponent;
    let fixture: ComponentFixture<ImportNetDialogComponent>;
    const dialogMock = {
        backdropClick: () => {
            return new Observable<MouseEvent>()
        }
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImportNetDialogComponent],
            imports: [
                SideMenuImportNetComponentModule,
                HttpClientTestingModule,
                AuthenticationModule,
                NoopAnimationsModule,
                TranslateLibModule,
                MatIconModule,
                SnackBarModule,
                MatDialogModule
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: dialogMock},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: PetriNetResourceService, useClass: MyPetriNetResource},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImportNetDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class MyPetriNetResource {
    importPetriNet(file) {
        return of({success: 'success'});
    }
}
