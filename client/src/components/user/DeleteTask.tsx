import type { FunctionComponent } from "react";
import { priorityConvert, statusConvert, typeConvert, workerTaskIdConvert } from "../../helpers/Convert_valueSelectsToString";
import { deleteTask } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { useNavigate, useParams } from "react-router-dom";
import style from '../../style/addMission/addMission.module.css';
import { errorMessage, successMessage } from "../../toastify/toastifyService";

interface DeleteTaskProps {
    task: any,
    onCloseDeleting: any
}

const DeleteTask: FunctionComponent<DeleteTaskProps> = ({ task, onCloseDeleting }) => {

    const nav = useNavigate();
    const { id } = useParams();

    return (<>
        <div className={style.warpper_form}>
            <button
                className="close_popUp_btn"
                id={style.btnclosePopUp}
                type="button"
                onClick={() => onCloseDeleting(false)}
            >&#10060;</button>

            <h3 style={{ color: "red" }}>אתה בטוחה שברצונך למחוק משימה זו ?</h3>
            <br /><br />
            <div>
                <h1>{task.title}</h1>
                <p>{task.subTitle}</p>
                <p>{task.description}</p>
                <div style={{ display: "flex", gap: "20px" }}>
                    <p>{statusConvert[task.status]}</p> |
                    <p>{typeConvert[task.type]}</p> |
                    <p>{priorityConvert[task.priority]}</p>
                </div>
                <p><span>תאריך תחילה : </span>{task.receiptDate}</p>
                <p><span>תאריך סיום : </span>{task.deadLine}</p>
                <p><span>עובד משויך :</span>{workerTaskIdConvert[task.workerTaskId]}</p>
                <p><span>יוצר המשימה :</span>{task.userIdCreatorTask}</p>

            </div>

            <button type="submit" id={style.btnAddMission} className={style.add_task_btn}
                onClick={() => {
                    const token = getTokenInStorage() as string
                    deleteTask(task._id as string, token)
                        .then(res => {
                            onCloseDeleting(false);
                            // window.location.reload();
                            if (id) nav(-1);
                            successMessage("משימה נמחקה בהצלחה !")
                        })
                        .catch(error => {
                            errorMessage(error.response.data);
                        })
                }}>
                delete
            </button>

        </div>
    </>);
}

export default DeleteTask;