import { jwtDecode } from "jwt-decode";

//פענוח טוקן
const tokenDecoding = (token: string) => {
    const payload = jwtDecode(token);
    return payload;
}

const saveTokenInStorage = (token: string) => {
    if (Storage) {
        sessionStorage.setItem('token', token);
    }
    return null;
}

const getTokenInStorage = () => {
    if (Storage) {
        return sessionStorage.getItem('token');
    }
    return null;
}

const removeTokenFromStorage = () => {
    sessionStorage.removeItem("token")
}


export {
    tokenDecoding,
    saveTokenInStorage,
    getTokenInStorage,
    removeTokenFromStorage
}