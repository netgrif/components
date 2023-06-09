import {InjectionToken} from '@angular/core';
import {ComponentType} from '@angular/cdk/portal';

export const NAE_USER_ASSIGN_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeUserAssignDialogComponent');
export const NAE_FILES_UPLOAD_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeFilesUploadDialogComponent');
export const NAE_NEW_CASE_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeNewCaseDialogComponent');
export const NAE_OPTION_SELECTOR_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeOptionSelectorDialogComponent');
export const NAE_SAVE_FILTER_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeSaveFilterDialogComponent');
export const NAE_LOAD_FILTER_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeLoadFilterDialogComponent');
export const NAE_USER_IMPERSONATE_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeUserImpersonateDialogComponent');
export const NAE_ADMIN_IMPERSONATE_DIALOG_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeAdminImpersonateDialogComponent');
