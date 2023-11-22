export const toCapitalLetter = (string) => {
    if (typeof string === 'string') {
        return string[0].toUpperCase() + string.slice(1)
    } else {
        return string
    }
    
}