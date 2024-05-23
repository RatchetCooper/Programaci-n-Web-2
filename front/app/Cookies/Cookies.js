class CookieManager {
    static setCookie(name, value, daysToLive){
        const date = new Date();
        date.setTime(date.getTime() +  (daysToLive * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    static deleteCookie(name){
        this.setCookie(name, null, -1); // Set expiry date in the past to delete the cookie
    }

    static getAllCokies(){return  decodeURIComponent(document.cookie);}
    static getCookie(name){
        const cDecoded = decodeURIComponent(document.cookie);
        const cArray = cDecoded.split("; ");
        let result = null;
        console.log(name);
        cArray.forEach(element => {
            if(element.indexOf(name) == 0){
                result = element.substring(name.length + 1)
            }
        });
        return result;
    }
}export default CookieManager;