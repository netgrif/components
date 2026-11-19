import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultNoFilterProvidedComponent} from './default-no-filter-provided.component';
import {TranslateLibModule} from '@netgrif/components-core';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {MatIconModule} from "@angular/material/icon";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('DefaultNoFilterProvidedComponent', () => {
    let component: DefaultNoFilterProvidedComponent;
    let fixture: ComponentFixture<DefaultNoFilterProvidedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultNoFilterProvidedComponent],
            imports: [
                TranslateLibModule,
                MatIconModule
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultNoFilterProvidedComponent);
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
