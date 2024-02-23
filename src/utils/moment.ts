import moment from "moment"

export const dateToString = (date: Date, format = 'DD/MM/YYYY') => {
    return moment(date).format(format);
}

export const dateHeadingForTripHeading = (dates: Date[], format = 'DD/MM/YYYY') => {
    return dates.reduce((head: string, date: Date) => {
        return head + `${dateToString(date)} - `
    }, '')
}

export const stringToDate = (string: string, format = 'DD/MM/YYYY') => {
    return moment(string, format).toDate();
}

export const arrangeDatesInOrder = (dateStrings: string[]) => {
    const dates: Date[] = dateStrings.map(item => stringToDate(item))
    dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());

    return dates.map(item => dateToString(item));
}

export const getValueFromDate = (value: Date, purpose: 'date' | 'day' | 'month' | 'year') => {
    switch (purpose) {
        case 'date':
            return moment(value).get('date')
        case 'day':
            return moment(value).format('ddd')
        case 'month':
            return moment(value).get('month') + 1
        case 'year':
            return moment(value).get('year')
    }
}