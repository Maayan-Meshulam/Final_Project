import axios from "axios";
const API_USERS = 'http://localhost:3131/users';

//התחברות
const loginUser = (user: any) => {
    console.log("in login");
    return axios.post(`${API_USERS}/login`, user);
};

export {
    loginUser
}
