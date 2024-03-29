export const isLoggedIn = () => {
    if (localStorage.getItem("data"))
        return true
    else
        return false

}

export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next()
}

export const logout = (next) => {
    localStorage.removeItem("data")
    next()
}

export const getCurrentUserDetails = () => {
    if (isLoggedIn) {
        return JSON.parse(localStorage.getItem("data"))?.user;
    } else {
        return undefined
    }
}

export const getToken = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("data")).token
    } else {
        return null
    }
}