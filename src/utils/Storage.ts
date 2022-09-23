export class SessionStorage {
    static reset() {
        window.sessionStorage.clear();
    }
    static get(key: string) {
        return window.sessionStorage.getItem(key);
    }

    static getOrDefault(key: string, defaultValue: string) {
        const value = window.sessionStorage.getItem(key);
        if (!value) {
            this.set(key, defaultValue);
            return defaultValue;
        }
        return value;
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
