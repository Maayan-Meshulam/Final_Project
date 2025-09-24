import { patchConnectedEmployees } from "../services/userService"

export const connectingEmployessToManager = (managerId: string, userId: string, prevConnectingEmployes: any, token: string) => {
    patchConnectedEmployees(managerId, userId, prevConnectingEmployes, token)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));
}