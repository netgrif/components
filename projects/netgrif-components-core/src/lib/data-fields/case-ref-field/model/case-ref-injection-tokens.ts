import {InjectionToken} from '@angular/core';
import {CaseRefField} from './case-ref-field';

export const NAE_CASE_REF_CREATE_CASE = new InjectionToken<boolean>('NaeCaseRefCreateCase');
export const NAE_CASE_REF_SEARCH = new InjectionToken<boolean>('NaeCaseRefSearch');
export const NAE_CASE_REF_DATAFIELD = new InjectionToken<CaseRefField>('NaeCaseRefDatafield');
