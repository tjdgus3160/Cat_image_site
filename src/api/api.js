const API_ENDPOINT =
    'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev'

const request = async (url) => {
    const response = await fetch(url)
    try {
        if (response.status === 200) {
            const data = response.json()
            return data
        } else {
            const errorData = response.json()
            throw errorData
        }
    } catch (e) {
        throw {
            message: e.message,
            status: e.status,
        }
    }
}

function filterData(data) {
    if (data.hasOwnProperty('data')) {
        return true
    }
    return false
}

const api = {
    fetchCats: async (keyword) => {
        try {
            const infos = await request(
                `${API_ENDPOINT}/api/cats/search?q=${keyword}`
            )
            const infoDetails = infos.data.map(async (info) => {
                const res = await fetch(`${API_ENDPOINT}/api/cats/${info.id}`)
                return res.json()
            })
            const response = await Promise.all(infoDetails)
            const result = response.filter(filterData)
            return {
                isError: false,
                data: result,
            }
        } catch (e) {
            return {
                isError: true,
                data: e,
            }
        }
    },
    fetchRandomCats: async (keyword) => {
        try {
            const infos = await request(`${API_ENDPOINT}/api/cats/random50`)
            const infoDetails = infos.data.map(async (info) => {
                const res = await fetch(`${API_ENDPOINT}/api/cats/${info.id}`)
                return res.json()
            })
            const response = await Promise.all(infoDetails)
            const result = response.filter(filterData)
            return {
                isError: false,
                data: result,
            }
        } catch (e) {
            return {
                isError: true,
                data: e,
            }
        }
    },
}

export { api }
