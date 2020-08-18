import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserValue} from '../../../../../data-fields/user-field/models/user-value';
import {UserAssignItemComponent} from './user-assign-item.component';
import {Component} from '@angular/core';
import {MaterialModule} from '../../../../../material/material.module';
import {TranslateLibModule} from '../../../../../translate/translate-lib.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UserAssignItemComponent', () => {
    let component: UserAssignItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule],
            declarations: [
                UserAssignItemComponent,
                TestWrapperComponent
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
    template: '<nae-user-assign-item [user]="user"></nae-user-assign-item>'
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
