const ALLOWS_COOKIES : string = "allowsCookies";

let allowsCookies : boolean = true;
allowsCookies = getCookiesAllowed();

const btnAllow = document.getElementById("BtnAllow") as HTMLElement;
const btnDecline = document.getElementById("BtnDecline") as HTMLElement;

btnAllow.addEventListener('click', hideCookieWindow);
btnDecline.addEventListener('click', hideCookieWindow);
btnAllow.addEventListener('click', function () {
   setAllowCookies(true);
});
btnDecline.addEventListener('click', function () {
   setAllowCookies(false);
});

function getCookiesAllowed() : boolean {
    if (!navigator.cookieEnabled) {
        return false;
    }
    allowsCookies = true;
    let c = readCookie(ALLOWS_COOKIES);
    allowsCookies = readCookie(ALLOWS_COOKIES) == "true";
    if (c == "true") {
        return true;
    } else if (c == "false") {
        return false;
    } else {
        showCookieWindow();
        return false;
    }
}

function hideCookieWindow() {
    (document.getElementById("CookieWindow") as HTMLElement).style.visibility = "hidden";
}

function showCookieWindow() {
    (document.getElementById("CookieWindow") as HTMLElement).style.visibility = "visible";
}

export function saveCookie(key:string, value:string, expires:number = -1) : void {
    if (!allowsCookies) {
        return;
    }
    let expiration : string = "";
    if (expires >= 0) {
        expiration = ";expires=" + new Date(expires).toUTCString() + ";path=/";
    }
    document.cookie = key + "=" + value + expiration;
}

export function readCookie(key:string) : string {
    if (!allowsCookies) {
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
    saveCookie(ALLOWS_COOKIES, value ? "true" : "false", addDays(Date.now(), 10));
}

function addDays(date : number, days : number) : number {
    return date + days * 86400000;
}
