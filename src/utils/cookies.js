import cookies from 'react-cookies';

export function setToken(name, value) {
    cookies.save(name, value);
}

export function getToken(name) {
    return cookies.load(name)
}