import { useEffect, useState, type FunctionComponent } from "react";
import { getTokenInStorage } from "../../services/tokenService";
import { useSelector } from "react-redux";
import { getAllTasks, getTaskById } from "../../services/tasksService";
import { priorityConvert, statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";
import { useNavigate } from "react-router-dom";
import DeleteTask from "../user/DeleteTask";
import UpdateTask from "../user/UpdaeTask";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';
import AddMission from "../user/AddMission";


interface ManageAllEmployesTasksProps {

}

const ManageAllEmployesTasks: FunctionComponent<ManageAllEmployesTasksProps> = () => {

    const token = getTokenInStorage() as string;
    const userInfo = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(userInfo) + "user info 77887878");

    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [displayAddMission, setDisplayAddMission] = useState<boolean>(false);

    const [allMyTasks, setAllMyTasks] = useState<any>([]);
    const [arrDeepSearch, setArrDeepSearch] = useState<any>([]);
    const [termSearch, setSearchTerm] = useState<string>("");
    const [typeSearch, setTypeSearch] = useState<string>("All");


    const filterdArr = () => {
        console.log(termSearch, typeSearch);
        switch (typeSearch) {
            case "All":
                setArrDeepSearch(allMyTasks);
                break;
            case "Completed":
                setArrDeepSearch(allMyTasks.filter((task: any) => task.status == "2"));
                break;
            case "Urgent":
                setArrDeepSearch(allMyTasks.filter((task: any) => task.priority == "3" || task.priority == "4"));
                break;
            case "Process":
                setArrDeepSearch(allMyTasks.filter((task: any) => task.status == "1"));
                break;
        }

        setArrDeepSearch((prev: any) => prev.filter((task: any) => task.title.toLowerCase().includes(termSearch.toLowerCase())));
    }


    useEffect(() => {
        console.log("hiiiii");

        getAllTasks(userInfo.connectedEmployess, token, userInfo.id)
            .then((res: any) => {
                console.log(res.data);
                setAllMyTasks(res.data);
                setArrDeepSearch(res.data);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [userInfo])


    useEffect(() => {
        filterdArr();
    }, [termSearch, typeSearch, allMyTasks]);

    return (<>
        <div className="container">


            <div className={style.containerAbove}>
                <button id={style.addTaskBtn} onClick={() => setDisplayAddMission(true)}>
                    Add Task <i className="fa-solid fa-plus"></i>
                </button>

                {displayAddMission && <AddMission oncloseAddMission={setDisplayAddMission} />}

                <div className={`${style.containerQuickBtn} row`}>
                    <div className={`${style.btnDiv} col`} id={style.allTasks} onClick={() => {
                        setTypeSearch("All");

                    }}>
                        <i className="fa-solid fa-list"></i>
                        <span>כל המשימות</span>
                    </div>


                    <div className={`${style.btnDiv} col`} id={style.conpleteTasks} onClick={() => {
                        setTypeSearch("Completed");

                    }}>
                        <i className="fa-regular fa-circle-check"></i>
                        <span>הושלמו</span>
                    </div>


                    <div className={`${style.btnDiv} col`} id={style.urgentTasks} onClick={() => {
                        setTypeSearch("Urgent");

                    }}>
                        <i className="fa-solid fa-exclamation"></i>
                        <span>דחופות</span>
                    </div>


                    <div className={`${style.btnDiv} col`} id={style.inProcessTasks} onClick={() => {
                        setTypeSearch("Process");

                    }}>
                        <i className="fa-solid fa-hourglass-half"></i>
                        <span>בתהליך</span>
                    </div>

                    <div className={`${style.searchContainer} col`}>
                        <input type="text" className={style.search_input_filter_bar} onInput={(e: any) => {
                            setSearchTerm(e.target.value);
                        }} />
                        <i className={`fa-solid fa-magnifying-glass ${style.searchIcon}`}></i>
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
                                    arrDeepSearch.length > 0 && arrDeepSearch.map((task: any) => (
                                        <tr>
                                            <td>{task.title}</td>
                                            <td>{task.subTitle}</td>
                                            {/* <td>{task.description}</td> */}
                                            <td className={style[`priority${task.priority}`]}>{priorityConvert[task.priority]}</td>
                                            <td>{task.workerTaskId}</td>
                                            <td>{task.receiptDate}</td>
                                            <td>{task.deadLine}</td>
                                            <td>{statusConvert[task.status]}</td>
                                            <td>{typeConvert[task.type]}</td>
                                            <td>{task.userIdCreatorTask}</td>

                                            <td onClick={() => {
                                                setCloseUpdating(true);
                                                setSelectedTask(task);
                                            }}> <i className="fa-solid fa-pen-to-square"></i>
                                            </td>
                                            <td><i className="fa-solid fa-trash" onClick={() => {
                                                setSelectedTask(task);
                                                setCloseDeleting(true);
                                            }}></i>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            {closeDeleting && selectedTask && <DeleteTask onCloseDeleting={setCloseDeleting} task={selectedTask} />}
            {closeUpdating && selectedTask && <UpdateTask oncloseUpdating={setCloseUpdating} task={selectedTask} />}
        </div >
    </>);
}

export default ManageAllEmployesTasks;