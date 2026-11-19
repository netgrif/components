import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {AbstractOptionSelectorComponent} from './abstract-option-selector.component';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MaterialModule} from '../../../material/material.module';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractOptionSelectorComponent', () => {
    let component: TestOptionComponent;
    let fixture: ComponentFixture<TestOptionComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestOptionComponent],
            imports: [
                MaterialModule,
                TranslateModule,
                TranslateLibModule
            ],
            providers: [
                {provide: NAE_SIDE_MENU_CONTROL, useValue: {data: {title: '', options: []}}},
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestOptionComponent);
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

@Component({
    selector: 'ncc-test-option',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestOptionComponent extends AbstractOptionSelectorComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl) {
        super(_sideMenuControl);
    }
}
