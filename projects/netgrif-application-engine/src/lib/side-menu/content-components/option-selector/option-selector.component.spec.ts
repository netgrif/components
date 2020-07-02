import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OptionSelectorComponent} from './option-selector.component';
import {MaterialModule} from '../../../material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('OptionSelectorComponent', () => {
    let component: OptionSelectorComponent;
    let fixture: ComponentFixture<OptionSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                {provide: NAE_SIDE_MENU_CONTROL, useValue: {data: {title: '', options: []}}}
            ],
            declarations: [OptionSelectorComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
