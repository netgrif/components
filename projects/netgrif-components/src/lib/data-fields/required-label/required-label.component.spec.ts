import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequiredLabelComponent} from './required-label.component';

describe('RequiredLabelComponent', () => {
    let component: RequiredLabelComponent;
    let fixture: ComponentFixture<RequiredLabelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [],
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

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
