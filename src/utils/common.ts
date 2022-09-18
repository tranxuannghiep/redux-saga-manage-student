export const capitalizeString = (str: string): string => {
    if (!str) return '';
    return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const getMarkColor = (mark: number): string => {
    if (mark >= 8) return "green"
    if (mark >= 5) return "goldenrod";
    return 'red'
}

export const validateNumberPositive = (number: string) => {
    if (number.length === 0) return true
    const regNumber = /^[0-9]+$/
    return regNumber.test(number)
}

export const validateNumber = (number: number) => {
    if (number.toString().length === 0) return true
    const regNumber = /^-?\d+(\.?\d+)?$/
    return regNumber.test(number.toString())
}