import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultNoFilterProvidedComponent} from './default-no-filter-provided.component';
import {TranslateLibModule} from '@netgrif/components-core';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatIconModule} from "@angular/material/icon";

describe('DefaultNoFilterProvidedComponent', () => {
    let component: DefaultNoFilterProvidedComponent;
    let fixture: ComponentFixture<DefaultNoFilterProvidedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultNoFilterProvidedComponent],
            imports: [
                TranslateLibModule,
                HttpClientTestingModule,
                MatIconModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultNoFilterProvidedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
