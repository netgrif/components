import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import {AbstractFilterSelectorListItemComponent} from './abstract-filter-selector-list-item.component';
import {SimpleFilter} from '../../../../filter/models/simple-filter';
import {FilterType} from '../../../../filter/models/filter-type';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AbstractFilterSelectorListItemComponent', () => {
    let component: TestFilterComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule, HttpClientTestingModule
            ],
            declarations: [
                TestFilterComponent,
                TestWrapperComponent
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
    template: ''
})
class TestFilterComponent extends AbstractFilterSelectorListItemComponent {
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-filter [filter]="filter"></ncc-test-filter>'
})
class TestWrapperComponent {
    filter = new SimpleFilter('', FilterType.CASE, {});
}
