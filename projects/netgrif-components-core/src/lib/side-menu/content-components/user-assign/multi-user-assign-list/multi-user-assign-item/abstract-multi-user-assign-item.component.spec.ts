import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AbstractMultiUserAssignItemComponent} from './abstract-multi-user-assign-item.component';
import {UserValue} from '../../../../../data-fields/user-field/models/user-value';
import {TranslateLibModule} from '../../../../../translate/translate-lib.module';
import {MaterialModule} from '../../../../../material/material.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractMultiUserAssignItemComponent', () => {
    let component: TestUserComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestUserComponent, TestWrapperComponent],
            imports: [
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
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
    selector: 'ncc-test-user',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestUserComponent extends AbstractMultiUserAssignItemComponent {
    constructor() {
        super();
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-user [user]="user"></ncc-test-user>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestWrapperComponent {
    user = new UserValue('0', '', '', '');
}
