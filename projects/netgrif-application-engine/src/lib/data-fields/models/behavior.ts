/**
 * Describes the behavior of data fields.
 *
 * `required` is mutually exclusive with `optional`.
 *
 * `visible`, `editable`, `hidden` and `forbidden` are mutually exclusive with each other.
 */
export interface Behavior {
    /**
     * The data field's value must be filled and valid in order to finish a task.
     */
    required?: boolean;
    /**
     * Opposite of `required`.
     *
     * See [required]{@link Behavior#required}.
     */
    optional?: boolean;
    /**
     * The data field's value is visible to the user, but they cannot change it.
     * Data field Components that render such field are set to `disabled`.
     */
    visible?: boolean;
    /**
     * The value of the data field can be changed.
     * Data field Components that render such field are set to `enabled`.
     */
    editable?: boolean;
    /**
     * Information about the data field should not be displayed to the user.
     * Data field Components that render such field are removed from DOM.
     */
    hidden?: boolean;
    /**
     * Forbidden implies that information about this datafield should not be sent to frontend.
     * Fields with this behavior set to `true` can be only received in the {@link ChangedFields} object, when a field that wasn't previously
     * marked as `forbidden` had it's behavior changed.
     */
    forbidden?: boolean;
}
