import { useEffect, useState, type FunctionComponent } from "react";
import { getTokenInStorage } from "../../services/tokenService";
import { useSelector } from "react-redux";
import { getAllTasks, getTaskById } from "../../services/tasksService";
import { priorityConvert, statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";
import { useNavigate } from "react-router-dom";
import DeleteTask from "../user/DeleteTask";
import UpdateTask from "../user/UpdaeTask";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';


interface ManageAllEmployesTasksProps {

}

const ManageAllEmployesTasks: FunctionComponent<ManageAllEmployesTasksProps> = () => {

    const [allTasks, setAllTasks] = useState<any>([]);
    const token = getTokenInStorage() as string;
    const userInfo = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(userInfo) + "user info 77887878");

    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);


    const nav = useNavigate();

    useEffect(() => {
        console.log("hiiiii");

        getAllTasks(userInfo.connectedEmployess, token)
            .then((res: any) => {
                console.log(res.data);
                setAllTasks(res.data);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [])


    return (<>
        <div className="container">


            <div className={style.containerAbove}>

                <div className={style.containerQuickBtn}>
                    <div className={style.btnDiv} id={style.allTasks}>
                        <i className="fa-solid fa-list"></i>
                        <span>כל המשימות</span>
                    </div>
                    <div className={style.btnDiv} id={style.conpleteTasks}>
                        <i className="fa-regular fa-circle-check"></i>
                        <span>הושלמו</span>
                    </div>
                    <div className={style.btnDiv} id={style.urgentTasks}>
                        <i className="fa-solid fa-exclamation"></i>
                        <span>דחופות</span>
                    </div>
                    <div className={style.btnDiv} id={style.inProcessTasks}>
                        <i className="fa-solid fa-hourglass-half"></i>
                        <span>בתהליך</span>
                    </div>
                    <div>
                        <input type="text" className={style.search_input_filter_bar} />
                    </div>
                </div>



                <div>
                    <div className={style.scroller_container}>
                        <table className={style.dashBoardTasks}>
                            <thead>
                                <tr>
                                    <th>כותרת</th>
                                    <th>סטטוס</th>
                                    {/* <th>תיאור</th> */}
                                    <th>דחיפות</th>
                                    <th>עובד משויך</th>
                                    <th>תאריך התחלה</th>
                                    <th>תאריך סיום</th>
                                    <th>סטטוס</th>
                                    <th>סוג</th>
                                    <th>יוצר המשימה</th>
                                    <th>פרטים נוספים</th>
                                    <th>עריכה</th>
                                    <th>מחיקה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allTasks.length > 0 && allTasks.map((task: any) => (
                                        <tr>
                                            <td>{task.title}</td>
                                            <td>{task.subTitle}</td>
                                            {/* <td>{task.description}</td> */}
                                            <td>{priorityConvert[task.priority]}</td>
                                            <td>{task.workerTaskId}</td>
                                            <td>{task.receiptDate}</td>
                                            <td>{task.deadLine}</td>
                                            <td>{statusConvert[task.status]}</td>
                                            <td>{typeConvert[task.type]}</td>
                                            <td>{task.userIdCreatorTask}</td>
                                            <td onClick={() => {
                                                console.log('click on', task._id);
                                                getTaskById(task._id, token)
                                                    .then(res => nav(`/tasks/${task._id}`))
                                                    .catch(err => console.log(err))
                                            }}>פרטים נוספים</td>

                                            <td onClick={() => {
                                                setCloseUpdating(true);
                                            }}>עריכה</td>
                                            {/* <td>
                                                {closeUpdating && <UpdateTask oncloseUpdating={setCloseUpdating} task={task} />}
                                            </td> */}

                                            <td onClick={() => {
                                                setCloseDeleting(true);
                                                window.location.reload();
                                            }}>מחיקה</td>
                                            {/* <td>
                                                {closeDeleting && <DeleteTask onCloseDeleting={setCloseDeleting} task={task} />}
                                            </td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    </>);
}

export default ManageAllEmployesTasks;