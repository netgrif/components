import {AbstractSearchConfigurationInputComponent} from './abstract-search-configuration-input.component';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

describe('AbstractSearchConfigurationInputComponent', () => {
    let component: TestSearchConfigurationInputComponent;
    let fixture: ComponentFixture<TestSearchConfigurationInputComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestSearchConfigurationInputComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSearchConfigurationInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-search-configuration-input',
    template: ''
})
class TestSearchConfigurationInputComponent extends AbstractSearchConfigurationInputComponent {
    constructor() {
        super();
    }
}
