import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {SideMenuContainerComponent} from './side-menu-container.component';
import {CommonModule} from '@angular/common';
import {ImportNetComponent} from '../content-components/import-net/import-net.component';
import {MaterialModule, SideMenuService, TranslateLibModule} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('SideMenuContainerComponent', () => {
    let component: SideMenuContainerComponent;
    let fixture: ComponentFixture<SideMenuContainerComponent>;
    let service: SideMenuService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SideMenuContainerComponent],
            imports: [
                CommonModule,
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideMenuContainerComponent);
        service = TestBed.inject(SideMenuService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and close', () => {
        service.open(ImportNetComponent).onClose.subscribe(event => {
            expect(event).toBeTruthy();
        });
        service.close({opened: false});
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
