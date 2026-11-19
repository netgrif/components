export const DATE_FORMAT_STRING = 'DD.MM.YYYY';
export const DATE_TIME_FORMAT_STRING = 'DD.MM.YYYY HH:mm';

// https://momentjs.com/docs/#/displaying/format/
export const DATE_FORMAT = {
    parse: {
        dateInput: DATE_FORMAT_STRING,
    },
    display: {
        dateInput: DATE_FORMAT_STRING,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'Do MMMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export const TIME_FORMAT_STRING = 'HH:mm';

export const DATE_TIME_FORMAT = {
    parse: {
        dateInput: DATE_FORMAT_STRING,
        timeInput: TIME_FORMAT_STRING,
    },
    display: {
        dateInput: DATE_FORMAT_STRING,
        timeInput: TIME_FORMAT_STRING,
        timeOptionLabel: TIME_FORMAT_STRING,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'Do MMMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
