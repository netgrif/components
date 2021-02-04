import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {OptionSelectorComponent} from './option-selector.component';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, NAE_SIDE_MENU_CONTROL, TranslateLibModule} from '@netgrif/application-engine';

describe('OptionSelectorComponent', () => {
    let component: OptionSelectorComponent;
    let fixture: ComponentFixture<OptionSelectorComponent>;

    beforeEach(waitForAsync(() => {
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
