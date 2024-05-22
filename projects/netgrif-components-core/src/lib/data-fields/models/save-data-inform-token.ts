import {InjectionToken} from '@angular/core';

/**
 * Whether invalid data values should be sent to backend or not. Invalid data is NOT set to backend by default.
 * You can use this InjectionToken to override this behavior in a specific application scope.
 *
 * This token is ultimately injected by individual data fields, so this option can be in theory applied at a very low level of granularity.
 * The library implementation doesn't allow access to such low level components, so a custom implementation is necessary to provide this
 * token at such low level. Applying the token to individual task views is achievable with the default implementation.
 */
export const NAE_SAVE_DATA_INFORM = new InjectionToken<boolean>('NaeSaveDataInform');
