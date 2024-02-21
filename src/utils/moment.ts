import moment from "moment"

export const dateFormatter = (date: Date, format = 'DD/MM/YYYY') => {
    return moment(date).format(format);
}

export const dateHeadingForTripHeading = (dates: Date[], format = 'DD/MM/YYYY') => {
    return dates.reduce((head: string, date: Date) => {
        return head + `${moment(date).format(format)} - `
    }, '')
}