import axios from "axios";
import { object } from "yup";
const API_USERS = import.meta.env.VITE_API_USERS

//התחברות
const loginUser = (user: any) => {
    return axios.post(`${API_USERS}/login`, user);
};

const addUser = (user: any, token: string) => {
    const formData = new FormData();

    // מוסיפים את כל השדות לטופס
    Object.entries(user).forEach(([key, value]) => {
        if (key == "image") return;

        if (Array.isArray(value)) {
            // אם זה מערך, צריך להוסיף כל ערך בנפרד
            value.forEach(v => formData.append(`${key}[]`, v));
        } else if (typeof value == 'object' && value != null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
                formData.append(`${key}[${subKey}]`, String(subValue))
            })
        }
        else {
            formData.append(key, String(value));
        }
    });

    formData.append("image", user.url); // selectedFile הוא ה־File מה-input

    // שליחה
    return axios.post(`${API_USERS}/addUser`, formData, {
        headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data"
        }
    });

}

const getAllUsers = (managerEmployeesArray: string, token: string) => {
    return axios.get(`${API_USERS}?ArrEmployess=${managerEmployeesArray.toString()}`, {
        headers: { "x-auth-token": token },
    });

}

const getUserById = (userId: string, token: string) => {
    return axios.get(`${API_USERS}/${userId}`, {
        headers: { "x-auth-token": token }
    });

}

const getUserByEmail = (email: string) => {
    return axios.get(`${API_USERS}/email/${email}`);

}

const deleteUser = (userId: string, managerId: string, token: string) => {
    return axios.delete(`${API_USERS}/${userId}`, {
        headers: { 'x-auth-token': token },
        data: { manager_id: managerId }
    })
}

const updatingUser = (userId: string, token: string, newUser: any) => {
    const formData = new FormData();

    // מוסיפים את כל השדות לטופס
    Object.entries(newUser).forEach(([key, value]) => {
        if (key == "image") return;

        if (Array.isArray(value)) {
            // אם זה מערך, צריך להוסיף כל ערך בנפרד
            value.forEach(v => formData.append(`${key}[]`, v));
        } else if (typeof value == 'object' && value != null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
                formData.append(`${key}[${subKey}]`, String(subValue))
            })
        }
        else {
            formData.append(key, String(value));
        }
    });

    formData.append("image", newUser.url); // selectedFile הוא ה־File מה-input

    // שליחה
    return axios.put(`${API_USERS}/${userId}`, formData, {
        headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data"
        }
    });

}

const patchConnectedEmployees = (managerId: string, userId: string, prevConnectingEmployes: any, token: string) => {
    return axios.patch(`${API_USERS}/${managerId}`, { "connectedEmployess": [...prevConnectingEmployes, userId] },
        { headers: { 'x-auth-token': token } }
    )
}

const patchPass = (values: any, id: string, token: string) => {
    return axios.patch(`${API_USERS}/change-password/${id}?token=${token}`, values)
}

const sendEmail = (email: string, id: string, randomNum: number) => {
    return axios.post(`${API_USERS}/send-email`, { email, id, randomNum })
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
