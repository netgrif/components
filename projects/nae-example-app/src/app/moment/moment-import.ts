// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// eslint-disable-next-line no-duplicate-imports
// @ts-ignore
import {default as _rollupMoment} from 'moment';

export const moment = _rollupMoment || _moment;
