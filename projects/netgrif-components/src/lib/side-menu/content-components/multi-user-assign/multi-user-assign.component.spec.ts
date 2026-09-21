import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiUserAssignComponent} from './multi-user-assign.component';
import {
    ConfigurationService, MaterialModule,
    NAE_SIDE_MENU_CONTROL,
    SideMenuControl,
    TestConfigurationService, TranslateLibModule,
    UserListService
} from "@netgrif/components-core";
import {Observable} from "rxjs";
import {UserAssignComponent} from "../user-assign/user-assign.component";
import {UserAssignListComponent} from "../user-assign/user-assign-list/user-assign-list.component";
import {UserAssignItemComponent} from "../user-assign/user-assign-list/user-assign-item/user-assign-item.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MultiUserAssignComponent', () => {
    let component: MultiUserAssignComponent;
    let fixture: ComponentFixture<MultiUserAssignComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                NoopAnimationsModule,
                HttpClientTestingModule
            ],
            providers: [
                UserListService,
                {
                    provide: NAE_SIDE_MENU_CONTROL, useValue: new SideMenuControl(() => {
                    }, new Observable<boolean>(), null)
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                UserAssignComponent,
                UserAssignListComponent,
                UserAssignItemComponent,
                MultiUserAssignComponent
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiUserAssignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
