import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';
import AddMission from "../user/AddMission";
import { getMyTasks, like_unlike_task } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { priorityConvert, statusConvert, typeConvert } from "../../helpers/Convert_valueSelectsToString";
import UpdateTask from "../user/UpdaeTask";
import DeleteTask from "../user/DeleteTask";
import ErrorPremission from "../layot/ErrorPremission";
import { errorMessage } from "../../toastify/toastifyService";

interface ManageAllMissionsProps {

}

const ManageAllMissions: FunctionComponent<ManageAllMissionsProps> = () => {

    const [displayAddMission, setDisplayAddMission] = useState<boolean>(false);
    const [toggleAllMyTasks, setToggleAllMyTasks] = useState<boolean>(false);
    const [allMyTasks, setAllMyTasks] = useState<any>([]);
    const [closeDeleting, setCloseDeleting] = useState<boolean>(false);
    const [closeUpdating, setCloseUpdating] = useState<boolean>(false);
    const [toggleUpdaedUser, settoggleUpdaedUser] = useState<boolean>(false);
    const [arrDeepSearch, setArrDeepSearch] = useState<any>([]);
    const [termSearch, setSearchTerm] = useState<string>("");
    const [typeSearch, setTypeSearch] = useState<string>("All");
    const [selectedTask, setSelectedTask] = useState<any>(null);

    const filterdArr = () => {
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
            case "Star":
                setArrDeepSearch(allMyTasks.filter((task: any) => task.star == 1))
                break;
        }

        setArrDeepSearch((prev: any) => prev.filter((task: any) => task.title.toLowerCase().includes(termSearch.toLowerCase())));
    }


    let userInfo = useSelector((state: any) => state.userBaseInfo);

    const token = getTokenInStorage();

    const nav = useNavigate();


    //בטעינה ראשונית / כשיש שינוי במערך המשימות
    useEffect(() => {
        if (!token)
            return;
        
        getMyTasks(token as string)
            .then(res => {          
                console.log(res.data);
                     
                setAllMyTasks(res.data);
                setArrDeepSearch(res.data);
            })
            .catch(error => {
                errorMessage(error.message);
            })
    }, [displayAddMission, userInfo, closeUpdating, closeDeleting]);

    useEffect(() => {
        filterdArr();
    }, [termSearch, typeSearch, allMyTasks]);

    if (!userInfo.id) {
        return <ErrorPremission />
    }

    return (<>
        <div className="container">

            <div className="btn_back" onClick={() => nav(+1)}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="btn_forword" onClick={() => nav(-1)}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>

            <h1 className="main_title">המשימות שלי</h1>

            <div className={style.containerAbove}>
                <button id={style.addTaskBtn} onClick={() => setDisplayAddMission(true)}>
                    Add Task <i className="fa-solid fa-plus"></i>
                </button>

                {displayAddMission && <AddMission oncloseAddMission={setDisplayAddMission} onToggleAllMyTasks={setToggleAllMyTasks} />}

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

                    <div className={`${style.btnDiv} col`} id={style.inStarTasks} onClick={() => {
                        setTypeSearch("Star");

                    }}>
                        <i className="fa-solid fa-hourglass-half"></i>
                        <span>מועדפים</span>
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
                                    <th></th>
                                    <th>כותרת</th>
                                    <th>סטטוס</th>
                                    <th>סוג</th>
                                    <th>דחיפות</th>
                                    <th>תאריך התחלה</th>
                                    <th>תאריך סיום</th>
                                    <th>פרטים נוספים</th>
                                    <th>עריכה</th>
                                    <th>מחיקה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arrDeepSearch && arrDeepSearch.map((task: any) => (
                                        <tr key={task._id}>
                                            <td onClick={() => {
                                                like_unlike_task(token as string, task._id)
                                                    .then(res => {
                                                        setArrDeepSearch((prev: any) => prev.map((Originaltask: any) => {
                                                            return Originaltask._id == task._id ?
                                                                { ...task, star: res.data.star == 1 ? 1 : 0 } : Originaltask
                                                        }));
                                                        setAllMyTasks((prev: any) => prev.map((Originaltask: any) => {
                                                            return Originaltask._id == task._id ?
                                                                { ...task, star: res.data.star == 1 ? 1 : 0 } : Originaltask
                                                        }));
                                                    })
                                                    .catch(error => errorMessage(error.message))
                                            }}>
                                                {task.star == 1 ? <span className="starClick">&#9733;</span> :
                                                    <span className="starClick">&#9734;</span>}
                                            </td>
                                            <td>{task.title}</td>
                                            <td>{statusConvert[task.status]}</td>
                                            <td>{typeConvert[task.type]}</td>
                                            <td className={style[`priority${task.priority}`]}>{priorityConvert[task.priority]}</td>
                                            <td>{(task.receiptDate).split('T')[0]}</td>
                                            <td>{(task.deadLine).split('T')[0]}</td>
                                            <td onClick={() => { nav(`/tasks/${task._id}`) }}>
                                                <i className="fa-solid fa-eye"></i>
                                            </td>

                                            {
                                                (task.type == "1" || userInfo.id == task.userIdCreatorTask) ? (<>
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
                                                </>
                                                ) : (
                                                    <>
                                                        <td> <i className="fa-solid fa-pen-to-square" style={{ color: "gray" }}></i>
                                                        </td>
                                                        <td><i className="fa-solid fa-trash" style={{ color: "gray" }}></i>
                                                        </td>
                                                    </>
                                                )}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {closeDeleting && selectedTask && <DeleteTask onCloseDeleting={setCloseDeleting} task={selectedTask} />}
                {closeUpdating && selectedTask && <UpdateTask oncloseUpdating={setCloseUpdating} task={selectedTask} />}
            </div>
        </div >
    </>);

}

export default ManageAllMissions;