const ALLOWS_COOKIES : string = "allowsCookies";

let allowsCookies : boolean = readCookie(ALLOWS_COOKIES, true).toLowerCase() === "true";

export function saveCookie(key:string, value:string, expires:number = -1, override:boolean = false) : void {
    if (!override && !allowsCookies) {
        return;
    }
    let expiration : string = "";
    if (expires >= 0) {
        expiration = "; expires=" + new Date(expires);
    }
    document.cookie = key + "=" + value + expiration;
}

export function readCookie(key:string, override:boolean = false) : string {
    if (!override && !allowsCookies) {
        return "";
    }
    let allCookies : string[] = document.cookie.split(";");
    for (let cookie of allCookies) {
        let firstIndex = 0;
        if (cookie.charAt(0) == ' ') {
            firstIndex = 1;
        }
        if (cookie.substring(firstIndex, firstIndex+key.length) === key) {
            return cookie.substring(firstIndex+key.length+1).split("expires")[0];
        }
    }
    return "";
}

function setAllowCookies(value:boolean) : void {
    allowsCookies = value
    saveCookie(ALLOWS_COOKIES, value + "", addDays(Date.now(), 10), true);
}



function addDays(date : number, days : number) : number {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getDate();
}
