import axios from "axios";
const API_TASK = 'http://localhost:3131/tasks'

//הוספת משימה
const addTask = (task: any, token: string) => {
    console.log("in add task");
    return axios.post(API_TASK, task, {
        headers: {
            'x-auth-token': token
        }
    });
}

//עריכת משימה
const updatedTask = (task: any, taskId: number, token: string) => {
    console.log("in update task");
    return axios.put(`${API_TASK}/${taskId}`, task, {
        headers: {
            'x-auth-token': token
        }
    });
}

//מחיקת משימה
const deleteTask = (taskId: string, token: string) => {
    console.log("in delete task");
    return axios.delete(`${API_TASK}/${taskId}`, {
        headers: {
            'x-auth-token': token
        }
    });
}

const getMyTasks = (token: string) => {
    console.log("in my tasks");
    return axios.get(`${API_TASK}/myTasks`, {
        headers: { "x-auth-token": token }
    });
}

const getTaskById = (id: string, token: string) => {
    console.log("in get task by id");
    return axios.get(`${API_TASK}/${id}`, {
        headers: { "x-auth-token": token }
    })
}

export {
    addTask,
    updatedTask,
    deleteTask,
    getMyTasks,
    getTaskById
}