import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelItemComponent } from './panel-item.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FeaturedValue } from '@netgrif/components-core';

describe('PanelItemComponent', () => {
    let component: PanelItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have featuredValue', () => {
        expect(component.featuredValue.value).toEqual('text');
    });

    it('should have label icon as leading', () => {
        expect(component.leadingIcon).toEqual('label');
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-panel-item [leadingIcon]="leadingIcon" [leadingIconEnabled]="index" [textEllipsis]="textEllipsis" ' +
        '[featuredValue]="featuredValue"></nc-panel-item>'
})
class TestWrapperComponent {
    leadingIcon = 'label';
    leadingIconEnabled = true;
    textEllipsis = true;
    featuredValue = {
        type: 'text',
        icon: 'label',
        value: 'text'
    } as FeaturedValue;
}
