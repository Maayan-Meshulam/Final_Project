import type { FunctionComponent } from "react";
import { statusConvert, typeConvert, workerTaskIdConvert } from "../../helpers/Convert_valueSelectsToString";
import { deleteTask } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { useNavigate } from "react-router-dom";

interface DeleteTaskProps {
    task: any,
    onCloseDeleting: (cloose: boolean) => void
}

const DeleteTask: FunctionComponent<DeleteTaskProps> = ({ task, onCloseDeleting }) => {

    const nav = useNavigate();

    return (<>
        <div style={{ backgroundColor: "gray", position:"absolute" }}>
            <h3>Are you sure you want to delete this Task ?</h3>
            <div>
                <h1>{task.title}</h1>
                <p>{task.subTitle}</p>
                <p>{task.description}</p>
                <p>{statusConvert[task.status]}</p>
                <p>{typeConvert[task.type]}</p>
                <p><span>start date: </span>{task.receiptDate}</p>
                <p><span>end date: </span>{task.deadLine}</p>
                <p><span>worker task Id :</span>{workerTaskIdConvert[task.workerTaskId]}</p>
                <p><span>user id creator task :</span>{workerTaskIdConvert[task.userIdCreatorTask]}</p>

            </div>
            <button type="button" onClick={() => {
                const token = getTokenInStorage() as string
                deleteTask(task._id as string, token)
                    .then(res => {
                        onCloseDeleting(false);
                        // nav('/tasks/myTasks');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }}>
                delete
            </button>

            <button type="button" onClick={()=>{
                onCloseDeleting(false)
            }}>
                close
            </button>
        </div>
    </>);
}

export default DeleteTask;