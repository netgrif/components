import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractUserListFieldComponent } from './abstract-user-list-field.component';
import { Component, Inject, Optional } from '@angular/core';
import { SideMenuService } from '../../side-menu/services/side-menu.service';
import { SnackBarService } from '../../snack-bar/services/snack-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { NAE_INFORM_ABOUT_INVALID_DATA } from '../models/invalid-data-policy-token';
import { UserListField } from './models/user-list-field';

describe('AbstractUserlListFieldComponent', () => {
  let component: TestUserListComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractUserListFieldComponent ]
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
    selector: 'ncc-test-user-list',
    template: ''
})
class TestUserListComponent extends AbstractUserListFieldComponent {
    constructor(sideMenuService: SideMenuService,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(sideMenuService, snackbar, translate, informAboutInvalidData);
    }
}

@Component({
    selector: 'ncc-test-wrapper',
    template: '<ncc-test-user-list [dataField]="field"> </ncc-test-user-list>'
})
class TestWrapperComponent {
    field = new UserListField('', '', {
        required: true,
        optional: true,
        visible: true,
        editable: true,
        hidden: true
    }, undefined);
}
