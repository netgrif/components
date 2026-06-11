import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {GridsterModule} from 'angular-gridster2';
import {FormBuilderModule} from '../form-builder.module';

import {GridsterComponent} from './gridster.component';

describe('GridsterComponent', () => {
  let component: GridsterComponent;
  let fixture: ComponentFixture<GridsterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        FormBuilderModule,
        RouterTestingModule.withRoutes([{path: 'modeler', redirectTo: ''}]),
        GridsterModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
