import axios from "axios";
const API_USERS = 'http://localhost:3131/users';

//התחברות
const loginUser = (user: any) => {
    console.log("in login");
    return axios.post(`${API_USERS}/login`, user);
};

const addUser = (user: any)=>{
    console.log("in add user");
    return axios.post(`${API_USERS}/addUser`, user);
}

export {
    loginUser,
    addUser
}
