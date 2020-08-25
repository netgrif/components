import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationDrawerComponent} from './navigation-drawer.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {NavigationTreeComponent} from '../navigation-tree/navigation-tree.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
    TestConfigurationService,
    ConfigurationService,
    TranslateLibModule,
    MaterialModule
} from '@netgrif/application-engine';
import {UserComponentModule} from '../../user/user.module';

describe('NavigationDrawerComponent', () => {
    let component: NavigationDrawerComponent;
    let fixture: ComponentFixture<NavigationDrawerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationDrawerComponent, NavigationTreeComponent],
            imports: [
                CommonModule,
                RouterModule,
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelComponentModule,
                UserComponentModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open, close and toggle', async () => {
        await component.open().then(res  => {
            expect(res).toEqual('open');
        });

        await component.close().then(res  => {
            expect(res).toEqual('open');
        });

        await component.toggle().then(res  => {
            expect(res).toEqual('open');
        });
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
