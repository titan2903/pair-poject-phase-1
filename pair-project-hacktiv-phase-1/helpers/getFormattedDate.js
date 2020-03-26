function getFormattedDate(date) {
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
}

module.exports = getFormattedDate