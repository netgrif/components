import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GroupNavigationComponentResolverComponent} from './group-navigation-component-resolver.component';
import {NavigationComponentModule} from '../navigation.module';
import {GroupNavigationComponentResolverService} from '@netgrif/components-core';
import {
    ConfigurationService,
    TestConfigurationService,
    TestMockDependenciesModule,
    TestViewService,
    ViewService
} from '@netgrif/components-core';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from "rxjs";

describe('GroupNavigationComponentResolverComponent', () => {
    let component: GroupNavigationComponentResolverComponent;
    let fixture: ComponentFixture<GroupNavigationComponentResolverComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                RouterTestingModule.withRoutes([], { relativeLinkResolution: 'legacy' }),
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ViewService, useClass: TestViewService},
                {
                    provide: GroupNavigationComponentResolverService,
                    useValue: {
                        createResolvedViewComponentPortal: () => of(null)
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupNavigationComponentResolverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
