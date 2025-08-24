import axios from "axios";
const API_TASK = 'http://localhost:3131/users';

//התחברות
const loginUser = (user: any) => {
    console.log("in login");
    return axios.get(API_TASK, user);
};

export {
    loginUser
}
