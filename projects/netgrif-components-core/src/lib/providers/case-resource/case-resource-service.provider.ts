import { CaseResourceService } from '../../resources/engine-endpoint/case-resource.service';

export const CaseResourceServiceProvider = {
    provide: CaseResourceService,
    useClass: CaseResourceService
}
