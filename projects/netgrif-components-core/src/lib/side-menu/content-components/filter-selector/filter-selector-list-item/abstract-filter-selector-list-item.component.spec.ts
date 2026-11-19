import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractFilterSelectorListItemComponent} from './abstract-filter-selector-list-item.component';
import {SimpleFilter} from '../../../../filter/models/simple-filter';
import {FilterType} from '../../../../filter/models/filter-type';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractFilterSelectorListItemComponent', () => {
    let component: TestFilterComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestFilterComponent, TestWrapperComponent],
            imports: [],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
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
    selector: 'ncc-test-filter',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestFilterComponent extends AbstractFilterSelectorListItemComponent {
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-filter [filter]="filter"></ncc-test-filter>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    filter = new SimpleFilter('', FilterType.CASE, {});
}
