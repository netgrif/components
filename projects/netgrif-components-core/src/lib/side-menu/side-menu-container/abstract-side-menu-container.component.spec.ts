import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {SideMenuService} from '../services/side-menu.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Inject, ChangeDetectionStrategy} from '@angular/core';
import {AbstractSideMenuContainerComponent} from './abstract-side-menu-container.component';
import {AbstractImportNetComponent} from '../content-components/import-net/abstract-import-net.component';
import {NAE_SIDE_MENU_CONTROL} from '../side-menu-injection-token';
import {SideMenuControl} from '../models/side-menu-control';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {UriService} from "../../navigation/service/uri.service";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {take} from 'rxjs/operators';

describe('AbstractSideMenuContainerComponent', () => {
    let component: TestSideMenuComponent;
    let fixture: ComponentFixture<TestSideMenuComponent>;
    let service: SideMenuService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestSideMenuComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                CommonModule,
                MaterialModule,
                TranslateLibModule
            ],
            providers: [
                TranslateService,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestSideMenuComponent);
        service = TestBed.inject(SideMenuService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and close', (done) => {
        // the drawer may report a second (unexpected) close once the fixture is torn down
        service.open(TestImportComponent).onClose.pipe(take(1)).subscribe(event => {
            expect(event).toBeTruthy();
            done();
        });
        service.close({opened: false});
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-sidemenu',
    template: '<mat-sidenav-container class="side-menu-container">\n' +
        '    <mat-sidenav #rightSideMenu mode="over" position="end" class="side-menu" ngClass.lt-sm="side-menu-size-mobile"' +
        ' [ngClass.gt-xs]="portalWrapper.size">\n' +
        '        <ng-template [cdkPortalOutlet]="portalWrapper.portal"></ng-template>\n' +
        '    </mat-sidenav>\n' +
        '    <mat-sidenav-content>\n' +
        '        <ng-content></ng-content>\n' +
        '    </mat-sidenav-content>\n' +
        '</mat-sidenav-container>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestSideMenuComponent extends AbstractSideMenuContainerComponent {
    constructor(protected _sideMenuService: SideMenuService) {
        super(_sideMenuService);
    }
}

@Component({
    selector: 'ncc-test-import',
    template: '<input type="file" id="sidemenu-fileUpload" name="fileUpload" multiple="multiple" accept="text/xml"/>',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class TestImportComponent extends AbstractImportNetComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _petriNetResource: PetriNetResourceService,
                protected _uriService: UriService,
                protected _log: LoggerService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService) {
        super(_sideMenuControl, _petriNetResource, _uriService, _log, _snackbar, _translate);
    }
}
