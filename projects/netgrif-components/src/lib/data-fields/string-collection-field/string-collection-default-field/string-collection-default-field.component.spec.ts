import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StringCollectionDefaultFieldComponent} from './string-collection-default-field.component';
import {Component} from '@angular/core';
import {StringCollectionField, TranslateLibModule} from '@netgrif/components-core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StringCollectionDefaultFieldComponent', () => {
    let component: StringCollectionDefaultFieldComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslateLibModule,
                HttpClientTestingModule
            ],
            declarations: [StringCollectionDefaultFieldComponent]
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
});


@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-string-collection-default-field [dataField]="field"></nc-string-collection-default-field>'
})
class TestWrapperComponent {
    field = new StringCollectionField('', '', ['633c6187bb12a90925e0a17e'], {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined, undefined, undefined, []);
}
