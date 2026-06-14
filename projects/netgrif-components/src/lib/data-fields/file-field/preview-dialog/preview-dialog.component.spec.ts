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
import {AngularResizeEventModule} from 'angular-resize-event';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs';

describe('PreviewDialogComponent', () => {
    let component: PreviewDialogComponent;
    let fixture: ComponentFixture<PreviewDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                FlexLayoutModule,
                AngularResizeEventModule,
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule
            ],
            declarations: [PreviewDialogComponent],
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
                {provide: MatDialogRef, useValue: {}}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PreviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
