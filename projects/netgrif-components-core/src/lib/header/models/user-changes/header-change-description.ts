import {SortChangeDescription} from './sort-change-description';
import {SearchChangeDescription} from './search-change-description';
import {EditChangeDescription} from './edit-change-description';
import {ModeChangeDescription} from './mode-change-description';

export type HeaderChangeDescription = SortChangeDescription | SearchChangeDescription | EditChangeDescription | ModeChangeDescription;
