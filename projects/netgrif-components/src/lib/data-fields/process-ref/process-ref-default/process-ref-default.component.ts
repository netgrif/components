import {AfterViewInit, Component, Inject, Injector, OnDestroy, OnInit, Optional} from '@angular/core';
import {
    AbstractProcessRefDefaultComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    ProcessRefField
} from '@netgrif/components-core';
import {BuilderComponent} from '../../../builder/builder.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'nc-process-ref-default',
  templateUrl: './process-ref-default.component.html',
  styleUrls: ['./process-ref-default.component.scss']
})
export class ProcessRefDefaultComponent extends AbstractProcessRefDefaultComponent implements OnInit, AfterViewInit, OnDestroy {

    public height: number;
    protected subComp: Subscription;

    constructor(injector: Injector,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<ProcessRefField>) {
        super(injector, BuilderComponent, dataFieldPortalData)
    }

    ngOnInit() {
        this.checkProperties();
        this.subComp = this.dataField.componentChange$().subscribe(() => this.checkProperties());
    }

    protected checkProperties() {
        this.height = this.dataField.component?.properties?.height ? parseInt(this.dataField.component?.properties?.height) : 500;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subComp.unsubscribe();
    }

    ngAfterViewInit() {
        this.createPortal();
    }
}
