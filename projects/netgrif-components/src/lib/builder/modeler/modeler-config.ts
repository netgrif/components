import {DataType} from '@netgrif/petriflow';

export class ModelerConfig {
    public static SIZE = 32;
    public static MAX_WIDTH = 10000;
    public static MAX_HEIGHT = 5000;
    public static ZOOM_SPEED = 0.2;
    public static LAYOUT_DEFAULT_COLS = 4;
    public static VARIABLE_ARC_DATA_TYPES = [DataType.TEXT, DataType.ENUMERATION, DataType.ENUMERATION_MAP, DataType.NUMBER];
    public static ARC_BREAKPOINT_OFFSET = 10;
    public static HISTORY_SIZE = 100;
    public static LOCALSTORAGE = {
        DRAFT_MODEL: {
            KEY: 'old_model',
            TIMESTAMP: 'old_model_timestamp',
            ID: 'old_model_id',
            TITLE: 'old_model_title'
        },
        PERMISSION_DIALOG: {
            ROLE_SORT: 'role_sort',
            ROLE_DIRECTION: 'role_direction',
            USER_REF_SORT: 'user_ref_sort',
            USER_REF_DIRECTION: 'user_ref_direction'
        },
        MASTER_DETAIL: {
            DATA_SORT: 'master_data_sort',
            DATA_DIRECTION: 'master_data_direction',
            ROLE_SORT: 'master_role_sort',
            ROLE_DIRECTION: 'master_role_direction',
            DATA_ACTION_SORT: 'master_action_data_sort',
            DATA_ACTION_DIRECTION: 'master_action_data_direction',
            ROLE_ACTION_SORT: 'master_action_role_sort',
            ROLE_ACTION_DIRECTION: 'master_action_role_direction',
            TRANS_ACTION_SORT: 'master_action_trans_sort',
            TRANS_ACTION_DIRECTION: 'master_action_trans_direction',
            HISTORY_SORT: 'master_history_sort',
            HISTORY_DIRECTION: 'master_history_direction',
        }
    }
}
