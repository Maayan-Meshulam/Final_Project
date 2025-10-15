import axios from "axios";
const API_TASK = import.meta.env.VITE_API_TASK


//הוספת משימה
const addTask = (task: any, token: string) => {
    return axios.post(API_TASK, task, {
        headers: {
            'x-auth-token': token
        }
    });
}

//עריכת משימה
const updatedTask = (task: any, taskId: number, token: string) => {
    return axios.put(`${API_TASK}/${taskId}`, task, {
        headers: {
            'x-auth-token': token
        }
    });
}

//מחיקת משימה
const deleteTask = (taskId: string, token: string) => {
    return axios.delete(`${API_TASK}/${taskId}`, {
        headers: {
            'x-auth-token': token
        }
    });
}

const getMyTasks = (token: string) => {
    return axios.get(`${API_TASK}/myTasks`, {
        headers: { "x-auth-token": token }
    });
}

const getTaskById = (id: string, token: string) => {
    return axios.get(`${API_TASK}/${id}`, {
        headers: { "x-auth-token": token }
    })
}

const getAllTasks = (connectedEmployees: any, token: string) => {
    return axios.get(`${API_TASK}?arrEmployess=${connectedEmployees.toString()}`, {
        headers: { 'x-auth-token': token },
    });
}

const like_unlike_task = (token: string, taskId: number) => {
    return axios.patch(`${API_TASK}/like-unlike`, {task_id: taskId}, {
        headers: { 'x-auth-token': token }
    })
}

export {
    addTask,
    updatedTask,
    deleteTask,
    getMyTasks,
    getTaskById,
    getAllTasks,
    like_unlike_task
}