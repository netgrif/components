import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    DATA_FIELD_PORTAL_DATA,
    CaseRefField,
    WrappedBoolean,
    DataFieldPortalData
} from '@netgrif/components-core'
import { CaseRefDefaultComponent } from './case-ref-default.component';
import {FormControl} from "@angular/forms";

describe('CaseRefDefaultComponent', () => {
  let component: CaseRefDefaultComponent;
  let fixture: ComponentFixture<CaseRefDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRefDefaultComponent ],
        providers: [
            {provide: DATA_FIELD_PORTAL_DATA, useValue: {
                    dataField: new CaseRefField('', '', [], {
                        required: true,
                    }),
                    formControlRef: new FormControl(),
                    showLargeLayout: new WrappedBoolean()
                } as DataFieldPortalData<CaseRefField>
            }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRefDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
