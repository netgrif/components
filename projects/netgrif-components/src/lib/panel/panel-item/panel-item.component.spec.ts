import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelItemComponent } from './panel-item.component';
import { Component } from '@angular/core';
import { FeaturedValue } from '@netgrif/components-core';

describe('PanelItemComponent', () => {
    let component: PanelItemComponent;
    let fixture: ComponentFixture<PanelItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PanelItemComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PanelItemComponent);
        component = fixture.componentInstance;
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
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-panel-item [leadingIcon]="leadingIcon" [index]="index" [textEllipsis]="textEllipsis" ' +
        '[featuredValue]="featuredValue"></nc-panel-item>'
})
class TestWrapperComponent {
    leadingIcon = 'label';
    index = 0;
    textEllipsis = true;
    featuredValue = {
        type: 'text',
        icon: 'label',
        value: 'text'
    } as FeaturedValue;
}
