import {CreateViewArguments} from '../../create-view-prompt/models/create-view-arguments';

export interface NullableCreateViewArguments {
    path: CreateViewArguments['path'] | undefined;
    viewType: CreateViewArguments['viewType'] | undefined;
    layoutParams?: CreateViewArguments['layoutParams'];
    access: CreateViewArguments['access'] | undefined;
}
