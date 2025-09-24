import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/singleMission/singleMission.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskById } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { priorityConvert, statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";
import UpdateTask from '../user/UpdaeTask';
import DeleteTask from "./DeleteTask";
import { getUserById } from "../../services/userService";
import { useSelector } from "react-redux";
import imageTaskSrc from "../../images/task.png";

interface SingleMissionProps {

}

const SingleMission: FunctionComponent<SingleMissionProps> = () => {

    const user = useSelector((state: any) => state.userBaseInfo);

    const { id } = useParams();
    const token = getTokenInStorage() as string;
    const [task, setTask] = useState<any>(null);
    const [toggleupdatedTask, setToggleUpdaedTask] = useState<boolean>(false)
    const [closeDeleting, setCloseDeleting] = useState<string | null>(null);
    const [closeUpdating, setCloseUpdating] = useState<string | null>(null);
    const [workerTaskName, setWorkerTaskName] = useState<string>("");

    useEffect(() => {
        getTaskById(id as string, token)
            .then(res => {
                setTask(res.data);

                getUserById(res.data.workerTaskId, token)
                    .then(res => {
                        setWorkerTaskName(`${res.data.name.first} ${res.data.name.last}`);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))


    }, [toggleupdatedTask]);

    return (<>
        {task ? (<div className="container">

            <div className={style.containerWithImg}>
                <div className={style.task_characterization}>
                    <h1>{task.title}</h1>
                    <h3>{task.subTitle}</h3>
                    <p>{task.description}</p>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <p>{typeConvert[task.type]}</p> |
                        <p>{statusConvert[task.status]}</p> |
                        <p>{priorityConvert[task.priority]}</p>
                    </div>
                    <div style={{ textAlign: "justify" }}>
                        {style.description}
                    </div>
                    <div>
                        <p><span>תאריך התחלה : </span>{task.receiptDate}</p>
                        <p><span>תאריך סיום :</span>{task.deadLine}</p>
                    </div>
                    {user.managerLevel > 0 && <p>{workerTaskName}</p>}

                    {
                        (task.type == "1" || user.managerLevel > 1) &&
                        <div className={style.buttons_container}>
                            <button
                                type="button"
                                onClick={() => {
                                    setCloseUpdating(task._id);
                                }}
                            >Edit</button>

                            {closeUpdating && <UpdateTask oncloseUpdating={setCloseUpdating} task={task} />}

                            <button
                                type="button"
                                onClick={() => {
                                    setCloseDeleting(task._id);
                                }}
                            >Delete</button>
                            {closeDeleting && <DeleteTask onCloseDeleting={setCloseDeleting} task={task} />}

                        </div>
                    }

                </div>
                <img className={style.imgTask} src={imageTaskSrc} alt="task" />
            </div>
        </div>) : (<p>אין הרשאה לפעולה</p>)}

    </>);
}

export default SingleMission;