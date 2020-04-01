
const KEY = 'user_token';
const HOME_SSO = 'https://home.kms-technology.com/login?returnUrl=';

export const login = (returnUrl, routes) => {
    const token = new URLSearchParams(routes.search).get("accessToken");
    localStorage.setItem(KEY, token );
}

export const logout = () => {
    localStorage.removeItem(KEY);
}

export const isAuth = () => {
    if(localStorage.getItem(KEY) !== null) {
        return true;
    } 
    return false;
}