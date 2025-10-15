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
import ErrorPremission from "../layot/ErrorPremission";
import { errorMessage } from "../../toastify/toastifyService";

interface SingleMissionProps {

}

const SingleMission: FunctionComponent<SingleMissionProps> = () => {

    const user = useSelector((state: any) => state.userBaseInfo);
    const nav = useNavigate()

    const { id } = useParams();
    const token = getTokenInStorage() as string;
    const [task, setTask] = useState<any>(null);
    const [closeDeleting, setCloseDeleting] = useState<string | null>(null);
    const [closeUpdating, setCloseUpdating] = useState<string | null>(null);
    const [workerTaskName, setWorkerTaskName] = useState<string>("");
    const [workerTaskCreator, setWorkerTaskCreator] = useState<string>("");
    const [toggle, setToggle] = useState<boolean>(false);


    useEffect(() => {
        if (!token || toggle)
            return;

        getTaskById(id as string, token) //נביא את המשתמש עצמו שיצר את המשימה
            .then(res => {
                setTask(res.data);
                setWorkerTaskCreator(res.data.creatorName);
                setWorkerTaskName(res.data.workerName);
            })
            .catch(error => {
                errorMessage(error.message);
            })
    }, [user, closeUpdating, closeDeleting]);

    if (!user.id) {
        return <ErrorPremission />
    }

    return (<>
        {task ? (<div className="container">

            <div className="btn_back" onClick={() => nav(+1)}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="btn_forword" onClick={() => nav(-1)}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>


            <div className={style.containerWithImg}>
                <div className={style.task_characterization}>
                    <div style={{ display: "flex" }}>
                        <h1>{task.star == 1 ? <span>&#9733;</span> :
                            <span>&#9734;</span>}</h1>

                        <h1>{task.title}</h1>
                    </div>

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
                        <p><span>תאריך התחלה : </span>{(task.receiptDate).split('T')[0]}</p>
                        <p><span>תאריך סיום :</span>{(task.deadLine).split('T')[0]}</p>
                    </div>
                    {user.managerLevel > 0 && <>
                        <p><span>עובד משויך :</span>{workerTaskName}</p>
                        <p><span> יוצר המשימה :</span>{workerTaskCreator}</p>
                    </>}

                    {
                        (task.type == "1" || user.managerLevel > 1) &&
                        <div className={style.buttons_container}>
                            <button
                                id={style.exit}
                                type="button"
                                onClick={() => {
                                    setCloseUpdating(task._id);
                                }}
                            >Edit</button>

                            {closeUpdating && <UpdateTask oncloseUpdating={setCloseUpdating} task={task} />}

                            <button
                                id={style.delete}
                                type="button"
                                onClick={() => {
                                    setCloseDeleting(task._id);
                                    setToggle(true);
                                }}
                            >Delete</button>
                            {closeDeleting && <DeleteTask onCloseDeleting={setCloseDeleting} task={task} />}

                        </div>
                    }

                </div>
                <img className={style.imgTask} src={imageTaskSrc} alt="task" />
            </div>
        </div >) : (<ErrorPremission />)
        }

    </>);
}

export default SingleMission;