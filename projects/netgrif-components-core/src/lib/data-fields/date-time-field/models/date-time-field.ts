import {Behavior} from '../../models/behavior';
import {Moment} from 'moment';
import {AbstractTimeInstanceField} from '../../time-instance-abstract-field/models/abstract-time-instance-field';
import {Layout} from '../../models/layout';
import {Validation} from '../../models/validation';
import {Component, ComponentPrefixes} from '../../models/component';
import {AbstractBaseDataFieldComponent} from '../../base-component/abstract-base-data-field.component';

export class DateTimeField extends AbstractTimeInstanceField {

    public static readonly SHOW_SECONDS_PROPERTY = 'showSeconds';

    public static readonly ENABLE_MERIDIAN_PROPERTY = 'enableMeridian';

    public static readonly STEP_HOUR_PROPERTY = 'stepHour';
    public static readonly STEP_MINUTE_PROPERTY = 'stepMinute';
    public static readonly STEP_SECOND_PROPERTY = 'stepSecond';

    constructor(stringId: string, title: string, value: Moment, behavior: Behavior, placeholder?: string,
                description?: string, layout?: Layout, validations?: Array<Validation>, component?: Component, parentTaskId?: string) {
        super(stringId, title, value, behavior, placeholder, description, layout, validations, component, parentTaskId);
    }

    public get showSeconds(): boolean {
        return AbstractBaseDataFieldComponent.resolveBooleanProperty(
            this.component?.properties?.[DateTimeField.SHOW_SECONDS_PROPERTY],
            false
        );
    }

    public get stepHour(): number {
        return AbstractBaseDataFieldComponent.resolveNumberProperty(
            this.component?.properties?.[DateTimeField.STEP_HOUR_PROPERTY],
            1
        );
    }

    public get stepMinute(): number {
        return AbstractBaseDataFieldComponent.resolveNumberProperty(
            this.component?.properties?.[DateTimeField.STEP_MINUTE_PROPERTY],
            5
        );
    }


    public get stepSecond(): number {
        return AbstractBaseDataFieldComponent.resolveNumberProperty(
            this.component?.properties?.[DateTimeField.STEP_SECOND_PROPERTY],
            1
        );
    }

    public get enableMeridian(): boolean {
        return AbstractBaseDataFieldComponent.resolveBooleanProperty(
            this.component?.properties?.[DateTimeField.ENABLE_MERIDIAN_PROPERTY],
            false
        );
    }

    public getTypedComponentType(): string {
        return ComponentPrefixes.DATE_TIME + this.getComponentType();
    }

    protected valueEquality(a: Moment, b: Moment): boolean {
        return AbstractTimeInstanceField.isEqual(a, b, 'second');
    }
}
