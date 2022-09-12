import {InjectionToken} from '@angular/core';
import {ComponentType} from '@angular/cdk/portal';

export const NAE_USER_ASSIGN_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeUserAssignComponent');
export const NAE_FILES_UPLOAD_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeFilesUploadComponent');
export const NAE_NEW_CASE_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeNewCaseComponent');
export const NAE_OPTION_SELECTOR_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeOptionSelectorComponent');
export const NAE_SAVE_FILTER_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeSaveFilterComponent');
export const NAE_LOAD_FILTER_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeLoadFilterComponent');
export const NAE_USER_IMPERSONATE_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeUserImpersonateComponent');
