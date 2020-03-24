import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToolbarComponent} from './toolbar.component';
import {MaterialModule} from '../material/material.module';
import {
    TranslateLoader,
    TranslateModule,
    TranslatePipe,
    TranslateService,
    TranslateStore
} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from './toolbar.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [MaterialModule, HttpClientTestingModule,
            TranslateModule.forChild({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (HttpLoaderFactory),
                    deps: [HttpClient]
                }
            })],
        providers: [TranslateService, TranslatePipe, TranslateStore, HttpClient],
      declarations: [ ToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
