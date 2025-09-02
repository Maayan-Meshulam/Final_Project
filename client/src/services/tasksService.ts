import { retry } from "@reduxjs/toolkit/query";
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
const updateTask = (task: any) => {
    console.log("in update task");
    return axios.put(API_TASK, task);
}

//מחיקת משימה
const deleteTask = (taskId: string) => {
    console.log("in delete task");
    return axios.post(`${API_TASK}/${taskId}`, taskId);
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
    updateTask,
    deleteTask,
    getMyTasks,
    getTaskById
}