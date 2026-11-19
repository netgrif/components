import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAssignItemComponent} from './user-assign-item.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy} from '@angular/core';
import {MaterialModule, TranslateLibModule, UserValue} from '@netgrif/components-core';

describe('UserAssignItemComponent', () => {
    let component: UserAssignItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule,
                TranslateLibModule],
            declarations: [
                UserAssignItemComponent,
                TestWrapperComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nc-test-wrapper',
    template: '<nc-user-assign-item [user]="user"></nc-user-assign-item>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
