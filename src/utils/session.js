const tokenAdmin = 'adminToken';
export function setToken(name, value) {
    sessionStorage.setItem(name, value)
}

export function getToken(name) {
    return sessionStorage.getItem(name)
}