// use when a token is received after logging in
export const setToken = (token) => {
    return {
        type: 'NEW',
        payload: token
    }
}

// use if login has failed
export const clearToken = () => {
    return {
        type: 'EMPTY',
        payload: null
    }
}