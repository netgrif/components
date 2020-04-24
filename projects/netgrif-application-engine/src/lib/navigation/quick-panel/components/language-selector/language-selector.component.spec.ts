import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguageSelectorComponent} from './language-selector.component';
import {MaterialModule} from '../../../../material/material.module';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';

describe('LanguageSelectorComponent', () => {
    let component: LanguageSelectorComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LanguageSelectorComponent, TestWrapperComponent],
            imports: [
                CommonModule,
                RouterTestingModule,
                MaterialModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-language-selector language="sk"></nae-language-selector>'
})
class TestWrapperComponent {
    lang = 'sk';
}

