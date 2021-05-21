import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GroupNavigationComponentResolverComponent} from './group-navigation-component-resolver.component';

describe('GroupNavigationComponentResolverComponent', () => {
    let component: GroupNavigationComponentResolverComponent;
    let fixture: ComponentFixture<GroupNavigationComponentResolverComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupNavigationComponentResolverComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupNavigationComponentResolverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
