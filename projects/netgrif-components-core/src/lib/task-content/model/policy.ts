/**
 * Enum AssignPolicy
 *
 * value: MANUAL | AUTO
 */
export enum AssignPolicy {
    AUTO,
    MANUAL

}
/**
 * Enum FinishPolicy
 *
 * value: MANUAL | AUTO_NO_DATA
 */
export enum FinishPolicy {

    AUTO_NO_DATA,
    MANUAL
}
/**
 * Enum DataFocusPolicy
 *
 * value: MANUAL | AUTO_EMPTY_REQUIRED
 */
export enum DataFocusPolicy {
    manual = 'MANUAL',
    autoRequired = 'AUTO_EMPTY_REQUIRED'
}
