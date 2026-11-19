import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterSelectorListItemComponent} from './filter-selector-list-item.component';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FilterType, SimpleFilter} from '@netgrif/components-core';

describe('FilterSelectorListItemComponent', () => {
    let component: FilterSelectorListItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                FilterSelectorListItemComponent,
                TestWrapperComponent
            ]
        })
            .compileComponents();
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
    selector: 'nc-test-wrapper',
    template: '<nc-filter-selector-list-item [filter]="filter"></nc-filter-selector-list-item>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    filter = new SimpleFilter('', FilterType.CASE, {});
}
