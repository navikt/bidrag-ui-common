export class SessionStorage {
    static reset() {
        window.sessionStorage.clear();
    }
    static get(key: string) {
        return window.sessionStorage.getItem(key);
    }
    static set(key: string, value: string) {
        window.sessionStorage.setItem(key, value);
    }
}

export class LocalStorage {
    static reset() {
        window.localStorage.clear();
    }
    static get(key: string) {
        return window.localStorage.getItem(key);
    }
    static set(key: string, value: string) {
        window.localStorage.setItem(key, value);
    }
}
