import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterSelectorListItemComponent} from './filter-selector-list-item.component';
import {Component} from '@angular/core';
import {FilterType, SimpleFilter} from '@netgrif/application-engine';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('FilterSelectorListItemComponent', () => {
    let component: FilterSelectorListItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule],
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
    template: '<nc-filter-selector-list-item [filter]="filter"></nc-filter-selector-list-item>'
})
class TestWrapperComponent {
    filter = new SimpleFilter('', FilterType.CASE, {});
}
