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

export const DATE_TIME_FORMAT = {
    parse: {
        dateInput: DATE_TIME_FORMAT_STRING,
    },
    display: {
        dateInput: DATE_TIME_FORMAT_STRING,
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'Do MMMM YYYY HH:mm',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
