import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/singleMission/singleMission.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskById } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";
import UpdateTask from '../user/UpdaeTask';
import DeleteTask from "./DeleteTask";
import { getUserById } from "../../services/userService";
import { useSelector } from "react-redux";

interface SingleMissionProps {

}

const SingleMission: FunctionComponent<SingleMissionProps> = () => {

    const user = useSelector((state: any) => state.userBaseInfo);   

    const { id } = useParams();
    const token = getTokenInStorage() as string;
    const [task, setTask] = useState<any>(null);
    const [toggleupdatedTask, setToggleUpdaedTask] = useState<boolean>(false)
    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);
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
        {task ? (<div className="container_page">
            <div className={style.mission_container}>
                <div className={style.task_characterization}>
                    <h1>{task.title}</h1>
                    <h3>{task.subTitle}</h3>
                    <p>{task.description}</p>
                    <p>{statusConvert[task.status]}</p>
                    <p>{typeConvert[task.type]}</p>
                    <div style={{ textAlign: "justify" }}>
                        {style.description}
                    </div>
                    <div>
                        <p><span>start date: </span>{task.receiptDate}</p>
                        <p><span>end date: </span>{task.deadLine}</p>
                    </div>
                    {user.managerLevel > 0 && <p>{workerTaskName}</p>}
                    <div className={style.buttons_container}>

                        <button
                            type="button"
                            onClick={() => {
                                setCloseUpdating(true);
                            }}
                        >Edit</button>

                        {closeUpdating && <UpdateTask oncloseUpdating={setCloseUpdating} task={task} onToggleUetUpdaedTask={setToggleUpdaedTask} />}

                        <button
                            type="button"
                            onClick={() => {
                                setCloseDeleting(true);
                            }}
                        >Delete</button>
                        {closeDeleting && <DeleteTask onCloseDeleting={setCloseDeleting} task={task} />}

                    </div>
                </div>

                <div className={style.Marginal_information_task}>
                    <p>Attachments</p>
                    <div className={style.comments_container}>
                        <h6>comments</h6>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, modi!</li>
                            <li>Omnis, quae? Voluptate maiores quisquam eaque quidem distinctio repudiandae deleniti officiis repellendus.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>) : (<p>אין הרשאה לפעולה</p>)}

    </>);
}

export default SingleMission;