import Storage from 'js-storage'

const AUTHORIZATION = 'AUTHORIZATION'
const _username = '_username'
const murmur = 'murmur'

const sessionStorage = Storage.sessionStorage;
const localStorage = Storage.localStorage;
export function getToken() {
    return sessionStorage.get(AUTHORIZATION)
}

export function getUsername() {
    return sessionStorage.get(_username)
}

export function setToken(token) {
    return sessionStorage.set(AUTHORIZATION, token)
}

export function setUsername(username) {
    return sessionStorage.set(_username, username)
}

export function removeToken() {
    sessionStorage.remove(_username);
    return sessionStorage.remove(AUTHORIZATION)
}

export function setMurmur(value) {
    return localStorage.set(murmur,value)
}

export function getMurmur() {
    return localStorage.get(murmur)
}

