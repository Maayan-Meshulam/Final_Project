import { jwtDecode } from "jwt-decode";

//פענוח טוקן
const tokenDecoding = (token: string) => {
    console.log(token + "token rigth");
    // if(!token) return null

    const payload = jwtDecode(token);
    console.log(JSON.stringify(payload) + " payload");

    return payload;
}

const saveTokenInStorage = (token: string) => {
    if (Storage) {
        sessionStorage.setItem('token', token);
        console.log("token was save");
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