class CookieManager {
    static setCookie(name, value, daysToLive) {
        if (typeof document !== 'undefined') {
            const date = new Date();
            date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = `${name}=${value}; ${expires}; path=/`;
            console.log(`Cookie set: ${name}=${value}; ${expires}; path=/`);
        }
    }

    static deleteCookie(name) {
        this.setCookie(name, "", -1); // Set expiry date in the past to delete the cookie
        console.log(`Cookie deleted: ${name}`);
    }

    static getAllCookies() {
        if (typeof document !== 'undefined') {
            return decodeURIComponent(document.cookie);
        }
        return null;
    }

    static getCookie(name) {
        if (typeof document !== 'undefined') {
            const cDecoded = decodeURIComponent(document.cookie);
            const cArray = cDecoded.split("; ");
            let result = null;

            cArray.forEach(element => {
                if (element.indexOf(name + '=') === 0) {
                    result = element.substring(name.length + 1);
                }
            });

            console.log(`Cookie retrieved: ${name}=${result}`);
            return result;
        }
        return null;
    }
}

export default CookieManager;
