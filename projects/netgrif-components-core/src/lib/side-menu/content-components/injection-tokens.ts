import {InjectionToken} from '@angular/core';
import {ComponentType} from '@angular/cdk/portal';

/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_USER_ASSIGN_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeUserAssignComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_MULTI_USER_ASSIGN_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeMultiUserAssignComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_IMPORT_NET_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeImportNetComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_NEW_CASE_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeNewCaseComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_OPTION_SELECTOR_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeOptionSelectorComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_SAVE_FILTER_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeSaveFilterComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_LOAD_FILTER_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeLoadFilterComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_USER_IMPERSONATE_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeUserImpersonateComponent');
/**
 * @deprecated the side menu is deprecated, the library opens dialogs instead (`DialogComponentsModule`)
 */
export const NAE_ADMIN_IMPERSONATE_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeAdminImpersonateComponent');
export const NAE_SINGLE_TASK_VIEW_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeSingleTaskViewComponent');
export const NAE_TASK_VIEW_COMPONENT = new InjectionToken<ComponentType<unknown>>('NaeTaskViewComponent');
