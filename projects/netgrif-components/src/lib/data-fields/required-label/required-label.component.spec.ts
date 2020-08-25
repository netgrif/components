import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequiredLabelComponent} from './required-label.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('RequiredLabelComponent', () => {
    let component: RequiredLabelComponent;
    let fixture: ComponentFixture<RequiredLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [RequiredLabelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequiredLabelComponent);
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
