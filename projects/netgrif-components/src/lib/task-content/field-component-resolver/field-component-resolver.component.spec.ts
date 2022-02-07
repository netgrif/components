import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {FieldComponentResolverComponent} from './field-component-resolver.component';
import {DataFieldsComponentModule} from '../../data-fields/data-fields.module';
import {
    SingleTaskContentService,
    TaskContentService,
    createMockTask,
    ConfigurationService,
    TestConfigurationService,
    DatafieldGridLayoutElement,
    TaskElementType
} from '@netgrif/components-core';
import {Component} from '@angular/core';

describe('FieldComponentResolverComponent', () => {
    let component: FieldComponentResolverComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DataFieldsComponentModule],
            declarations: [TestComponent, FieldComponentResolverComponent],
            providers: [
                {provide: TaskContentService, useClass: SingleTaskContentService},
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();

        const taskContentService = TestBed.inject(TaskContentService);
        taskContentService.task = createMockTask();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-field-component-resolver [gridElement]="gridElement"></nc-field-component-resolver>'
})
class TestComponent {
    gridElement: DatafieldGridLayoutElement = {gridAreaId: 'id', type: TaskElementType.BLANK};
}
