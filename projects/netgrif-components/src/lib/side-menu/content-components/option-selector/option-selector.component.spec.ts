import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {OptionSelectorComponent} from './option-selector.component';
import {TranslateModule} from '@ngx-translate/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {MaterialModule, NAE_SIDE_MENU_CONTROL, TranslateLibModule} from '@netgrif/components-core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('OptionSelectorComponent', () => {
    let component: OptionSelectorComponent;
    let fixture: ComponentFixture<OptionSelectorComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OptionSelectorComponent],
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
