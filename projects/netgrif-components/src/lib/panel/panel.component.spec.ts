import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelComponent} from './panel.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@ngbracket/ngx-layout';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('PanelComponent', () => {
    let component: PanelComponent;
    let fixture: ComponentFixture<PanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PanelComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                // PanelComponent still binds [@.disabled] on mat-expansion-panel, which needs an animations provider
                MaterialModule,
                CommonModule,
                FlexModule,
                TranslateLibModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
