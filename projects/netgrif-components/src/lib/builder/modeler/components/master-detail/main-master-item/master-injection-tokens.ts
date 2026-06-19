import {InjectionToken} from '@angular/core';
import {AbstractMasterDetailService} from '../abstract-master-detail.service';

export const MASTER_ITEM = new InjectionToken<any>('MasterItem');
export const MASTER_SERVICE = new InjectionToken<AbstractMasterDetailService<any>>('MasterService');
