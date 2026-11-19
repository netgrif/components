import {AbstractSearchConfigurationInputComponent} from './abstract-search-configuration-input.component';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractSearchConfigurationInputComponent', () => {
    let component: TestSearchConfigurationInputComponent;
    let fixture: ComponentFixture<TestSearchConfigurationInputComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestSearchConfigurationInputComponent],
            imports: [],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
    selector: 'ncc-search-configuration-input',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestSearchConfigurationInputComponent extends AbstractSearchConfigurationInputComponent {
    constructor() {
        super();
    }
}
