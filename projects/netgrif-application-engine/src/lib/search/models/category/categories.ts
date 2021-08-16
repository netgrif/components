/**
 * Represents the available {@link Category} classes in a serializable form.
 */
export enum Categories {
    // Case categories
    CASE_AUTHOR = 'case_author',
    CASE_CREATION_DATE = 'case_creation_date',
    CASE_DATASET = 'case_dataset',
    CASE_PROCESS = 'case_process',
    CASE_ROLE = 'case_role',
    CASE_SIMPLE_DATASET = 'case_simple_dataset',
    CASE_TASK = 'case_task',
    CASE_TITLE = 'case_title',
    CASE_VISUAL_ID = 'case_visual_id',
    CASE_STRING_ID = 'case_string_id',

    // Task categories
    TASK_ASSIGNEE = 'task_assignee',
    TASK_PROCESS = 'task_process',
    TASK_ROLE = 'task_role',
    TASK_TASK = 'task_task',
}
