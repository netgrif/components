import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminImpersonateItemComponent} from './admin-impersonate-item.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MaterialModule, TranslateLibModule, UserValue} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AdminImpersonateItemComponent', () => {
    let component: AdminImpersonateItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule],
            declarations: [
                AdminImpersonateItemComponent,
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
    template: '<nc-user-impersonate-item [user]="user"></nc-user-impersonate-item>'
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
