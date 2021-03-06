function getItem(key) {
    const value = sessionStorage.getItem(key)

    if (key === 'data') {
        return value === null ? null : JSON.parse(value)
    } else if (key === 'keywords') {
        return value === null ? [] : JSON.parse(value)
    }
}

function setItem(key, value) {
    if (value) {
        const toJson = JSON.stringify(value)

        sessionStorage.setItem(key, toJson)
    }
}

export { getItem, setItem }
