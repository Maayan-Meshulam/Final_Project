import { useEffect, useState, type FunctionComponent } from "react";
import { getTokenInStorage } from "../../services/tokenService";
import { useSelector } from "react-redux";
import { getAllTasks } from "../../services/tasksService";
import { statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";

interface ManageAllEmployesTasksProps {

}

const ManageAllEmployesTasks: FunctionComponent<ManageAllEmployesTasksProps> = () => {

    const [allTasks, setAllTasks] = useState<any>([]);
    const token = getTokenInStorage() as string;
    const userInfo = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(userInfo) + "user info 77887878");

    useEffect(() => {
        console.log("hiiiii");

        getAllTasks(userInfo.connectedEmployess, token)
            .then((res: any) => {
                setAllTasks(res.data);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [])


    return (<>
        <table border={1}>
            <thead>
                <tr>
                    <th>כותרת</th>
                    <th>תת כותרת</th>
                    <th>תיאור</th>
                    <th>עובד משויך</th>
                    <th>תאריך התחלה</th>
                    <th>תאריך סיום</th>
                    <th>סטטוס</th>
                    <th>סוג</th>
                    <th>יוצר המשימה</th>
                </tr>
            </thead>
            <tbody>
                {allTasks.length > 0 && allTasks.map((task: any) => (
                    <tr>
                        <td>{task.title}</td>
                        <td>{task.subTitle}</td>
                        <td>{task.description}</td>
                        <td>{task.workerTaskId}</td>
                        <td>{task.receiptDate}</td>
                        <td>{task.deadLine}</td>
                        <td>{statusConvert[task.status]}</td>
                        <td>{typeConvert[task.type]}</td>
                        <td>{task.userIdCreatorTask}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>);
}

export default ManageAllEmployesTasks;