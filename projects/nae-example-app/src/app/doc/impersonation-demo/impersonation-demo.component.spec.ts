import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {ImpersonationDemoComponent} from './impersonation-demo.component';


describe('ImpersonationDemoComponent', () => {
  let component: ImpersonationDemoComponent;
  let fixture: ComponentFixture<ImpersonationDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpersonationDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpersonationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
