import axios from "axios";
const API_USERS = 'http://localhost:3131/users';

//התחברות
const loginUser = (user: any) => {
    console.log("in login");
    return axios.post(`${API_USERS}/login`, user);
};

const addUser = (user: any, token: string) => {
    console.log("in add user");
    return axios.post(`${API_USERS}/addUser`, user, {
        headers: { "x-auth-token": token }
    });
}

const getAllUsers = (managerEmployeesArray: string, token: string) => {
    console.log("in get all users axios");
    console.log(managerEmployeesArray + "manger id");

    return axios.get(`${API_USERS}?ArrEmployess=${managerEmployeesArray.toString()}`, {
        headers: { "x-auth-token": token },
    });

}

const getUserById = (userId: string, token: string) => {
    console.log("----------------" + userId);

    console.log("in get by id axios");
    return axios.get(`${API_USERS}/${userId}`, {
        headers: { "x-auth-token": token }
    });

}

const getUserByEmail = (email: string) => {
    console.log("in get by email axios");
    return axios.get(`${API_USERS}/email/${email}`);

}

const deleteUser = (userId: string, managerId: string, token: string) => {

    console.log("in delete user");
    return axios.delete(`${API_USERS}/${userId}`, {
        headers: { 'x-auth-token': token },
        data: { manager_id: managerId }
    })
}

const updatingUser = (userId: string, token: string, newUser: any) => {
    console.log("in axios update user");
    console.log(JSON.stringify(newUser));

    return axios.put(`${API_USERS}/${userId}`, newUser, {
        headers: { 'x-auth-token': token }
    })
}

const patchConnectedEmployees = (managerId: string, userId: string, prevConnectingEmployes: any, token: string) => {
    console.log("in patch axios");
    console.log(managerId + " manager id");
    console.log(userId + " user id");
    console.log(JSON.stringify([...prevConnectingEmployes, userId]));


    return axios.patch(`${API_USERS}/${managerId}`, { "connectedEmployess": [...prevConnectingEmployes, userId] },
        { headers: { 'x-auth-token': token } }
    )
}

const patchPass = (values: any, id:string, token:string) => {
    return axios.patch(`${API_USERS}/change-password/${id}?token=${token}`, values)
}

const sendEmail = (email: string, id:string, randomNum: number) => {
    console.log(email);
    return axios.post(`${API_USERS}/send-email`, { email, id, randomNum})
}

export {
    loginUser,
    addUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updatingUser,
    patchConnectedEmployees,
    patchPass,
    sendEmail,
    getUserByEmail
}
