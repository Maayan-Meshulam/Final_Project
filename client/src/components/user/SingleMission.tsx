import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/singleMission/singleMission.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskById } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";

interface SingleMissionProps {

}

const SingleMission: FunctionComponent<SingleMissionProps> = () => {

    const nav = useNavigate();
    const { id } = useParams();
    const token = getTokenInStorage();
    const [task, setTask]: any = useState(null);

    useEffect(() => {
        getTaskById(id as string, token as string)
            .then(res => setTask(res.data))
            .catch(err => console.log(err))
    }, []);

    return (<>
        {task ? (<div className="container_page">
            <div className={style.mission_container}>
                <div className={style.task_characterization}>
                    <h1>{task.title}</h1>
                    <p>{task.status}</p>
                    <div style={{ textAlign: "justify" }}>
                        {style.description}
                    </div>
                    {/* <p><span>responibility: </span>maayan meshulam</p> */}
                    <div>
                        <p><span>start date: </span>{task.receiptDate}</p>
                        <p><span>end date: </span>{task.deadLine}</p>
                    </div>
                    <div className={style.buttons_container}>
                        <button
                            type="button"
                            onClick={() => nav('/updateTask')}
                        >Edit</button>

                        <button
                            type="button"
                            onClick={() => {
                                deleteTask(id as string)
                                    .then(res => {
                                        console.log(res.data);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            }}
                        >Delete</button>

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