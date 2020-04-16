/**
 * Preferred layout of the displayed data field.
 *
 * `MATERIAL` - displays the material form field at 100% width of the available space.
 *
 * `NETGRIF` - displays the field at 100% width if the total width is bellow a given threshold (by default 250px).
 * Displays the field title on the left and the form filed on the right sharing the width 50:50 otherwise.
 * The form filed still uses material design with this setting.
 */
export enum TemplateAppearance {
    MATERIAL = 'material',
    NETGRIF = 'netgrif',
}
