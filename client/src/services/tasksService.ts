import axios from "axios";
const API_TASK = 'http://localhost:3131/tasks'

//הוספת משימה
const addTask = (task: any) => {
    console.log("in add task");
    return axios.post(API_TASK, task);
}

//עריכת משימה
const updateTask = (task: any) => {
    console.log("in update task");
    return axios.put(API_TASK, task);
}

//מחיקת משימה
const deleteTask = (taskId: number) => {
    console.log("in delete task");
    return axios.post(`${API_TASK}/${taskId}`, taskId);
}

const getMyCards = (userId: number) => {
    console.log("in my cards");
    return axios.get(`${API_TASK}/${userId}`);
}
export {
    addTask,
    updateTask,
    deleteTask,
    getMyCards
}