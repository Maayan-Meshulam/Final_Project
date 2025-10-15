import { patchConnectedEmployees } from "../services/userService"
import { errorMessage } from "../toastify/toastifyService";

export const connectingEmployessToManager = (managerId: string, userId: string, prevConnectingEmployes: any, token: string) => {
    patchConnectedEmployees(managerId, userId, prevConnectingEmployes, token)
        .then(res => {
        })
        .catch(error => errorMessage(error.message))
}