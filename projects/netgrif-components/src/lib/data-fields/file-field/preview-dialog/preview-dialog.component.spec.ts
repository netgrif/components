import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewDialogComponent} from './preview-dialog.component';
import {
    AuthenticationMethodService,
    ConfigurationService,
    FileField,
    MaterialModule,
    MockAuthenticationMethodService,
    TestConfigurationService,
    TranslateLibModule
} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('PreviewDialogComponent', () => {
    let component: PreviewDialogComponent;
    let fixture: ComponentFixture<PreviewDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PreviewDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                MaterialModule,
                FlexLayoutModule,
                TranslateLibModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {
                    provide: MAT_DIALOG_DATA, useValue: {
                        imageFull: of(''),
                        dataField: new FileField('', '', {
                            required: true,
                            optional: true,
                            visible: true,
                            editable: true,
                            hidden: true
                        }, {file: null, name: ''})
                    }
                },
                {provide: MatDialogRef, useValue: {}},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
