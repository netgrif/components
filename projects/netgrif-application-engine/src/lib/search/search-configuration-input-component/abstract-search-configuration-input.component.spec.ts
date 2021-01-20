import {AbstractSearchConfigurationInputComponent} from './abstract-search-configuration-input.component';
import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

describe('AbstractSearchConfigurationInputComponent', () => {
    let component: TestSearchConfigurationInputComponent;
    let fixture: ComponentFixture<TestSearchConfigurationInputComponent>;

    beforeEach(async(() => {
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
