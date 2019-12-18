import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetgrifApplicationEngineComponent } from './netgrif-application-engine.component';

describe('NetgrifApplicationEngineComponent', () => {
  let component: NetgrifApplicationEngineComponent;
  let fixture: ComponentFixture<NetgrifApplicationEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetgrifApplicationEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetgrifApplicationEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
