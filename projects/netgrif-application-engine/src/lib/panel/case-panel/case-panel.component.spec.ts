import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CasePanelComponent} from './case-panel.component';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsModule} from '../../data-fields/data-fields.module';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {PanelComponent} from '../panel.component';

describe('CasePanelComponent', () => {
    let component: CasePanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                DataFieldsModule
            ],
            declarations: [CasePanelComponent, PanelComponent, TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-case-panel [casePanelDefinition]="caseDef"> </nae-case-panel>'
})
class TestWrapperComponent {
    caseDef =  {featuredFields : [], panelIcon: 'home', panelIconField: 'home'};
}
