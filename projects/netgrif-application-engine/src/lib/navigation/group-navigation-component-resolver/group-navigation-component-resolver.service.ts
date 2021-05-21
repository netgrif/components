import {Injector, Type} from '@angular/core';
import {Case} from '../../resources/interface/case';
import {ComponentPortal} from '@angular/cdk/portal';
import {Observable, ReplaySubject} from 'rxjs';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {NAE_FILTER_CASE} from '../model/filter-case-injection-token';

export abstract class GroupNavigationComponentResolverService {

    protected constructor(protected _caseResourceService: CaseResourceService, protected _parentInjector: Injector) {
    }

    protected abstract resolveViewComponent(filterCase: Case): Type<any>;

    public createResolvedViewComponentPortal(caseId: string): Observable<ComponentPortal<any>> {
        const result = new ReplaySubject<ComponentPortal<any>>(1);
        this._caseResourceService.getOneCase(caseId).subscribe(filterCase => {
            result.next(new ComponentPortal(
                this.resolveViewComponent(filterCase),
                null,
                Injector.create({providers: [{provide: NAE_FILTER_CASE, useValue: filterCase}], parent: this._parentInjector})
            ));
            result.complete();
        });
        return result.asObservable();
    }
}
