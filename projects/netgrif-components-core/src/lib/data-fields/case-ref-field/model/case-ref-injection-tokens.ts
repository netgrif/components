import {InjectionToken} from '@angular/core';
import {CaseRefField} from './case-ref-field';

export const NAE_CASE_REF_CREATE_CASE = new InjectionToken<boolean>('NaeCaseRefCreateCase');
export const NAE_CASE_REF_SEARCH = new InjectionToken<boolean>('NaeCaseRefSearch');
export const NAE_CASE_REF_DATAFIELD = new InjectionToken<CaseRefField>('NaeCaseRefDatafield');
export const NAE_CLICKABLE_CASES = new InjectionToken<boolean>('NaeClickableCases');
export const NAE_OPEN_SINGLE_TASK = new InjectionToken<boolean>('NaeOpenSingleTask');
export const NAE_SINGLE_TASK_QUERY = new InjectionToken<string>('NaeSingleTaskQuery');
export const NAE_DATAFIELD_ALLOWED_NETS = new InjectionToken<boolean>('NaeDatafieldAllowedNets');

