import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToolbarComponent} from './toolbar.component';
import {MaterialModule} from '../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../translate/translate-lib.module';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule, HttpClientTestingModule, TranslateLibModule],
            declarations: [ToolbarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
