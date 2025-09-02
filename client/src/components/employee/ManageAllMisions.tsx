import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';
import AddMission from "../user/AddMission";
import { getMyTasks } from "../../services/tasksService";
import { getTokenInStorage } from "../../services/tokenService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ManageAllMissionsProps {

}

const ManageAllMissions: FunctionComponent<ManageAllMissionsProps> = () => {

    const [displayAddMission, setDisplayAddMission] = useState<boolean>(false);
    const [toggleAllMyTasks, setToggleAllMyTasks] = useState<boolean>(false);
    const [allMyTasks, setAllMyTasks] = useState<any>([]);


    let user = useSelector((state: any) => state.userBaseInfo);
    console.log("........." + JSON.stringify(user));

    const token = getTokenInStorage();
    console.log(token + "token from storage");
    console.log(JSON.stringify(user) + "user");

    const nav = useNavigate();


    //בטעינה ראשונית / כשיש שינוי במערך המשימות
    useEffect(() => {
        getMyTasks(token)
            .then(res => {
                console.log((res.data));
                setAllMyTasks(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [toggleAllMyTasks, user]);

    if (!user.id) {
        return (<>
            <p>אין לך הרשאה לפעולה זו</p>
        </>)
    }
    else {
        return (<>
            <div className="container_page">

                {/* add mission - click will open a popUp form to add mission */}
                <div onClick={() => setDisplayAddMission(true)}>Add Mission</div>
                {displayAddMission && <AddMission oncloseAddMission={setDisplayAddMission} onToggleAllMyTasks={setToggleAllMyTasks} />}

                <div className={style.filter_Bar}>
                    <div>
                        <span id={style.resultFilter}>results : 8</span>
                        <input type="text" className={style.search_input_filter_bar} />
                    </div>

                    <div>
                        <span id={style.sort}>SORT</span>
                        <span id={style.filter}>FILTER</span>
                    </div>
                    <button id={style.claerAllFiltersBtn}>clear all</button>

                </div>

                <div className={style.scroller_container}>
                    <div className={style.all_preview_mission_container}>
                        {
                            allMyTasks.map((task: any) => (
                                <div className={style.preview_mission} key={task._id} onClick={()=>{nav(`/tasks/${task._id}`)}}>
                                    <h5>{task.title}</h5>
                                    <div>
                                        <span id={task.statusMission}>{task.status}</span>
                                        <span id={task.typeMission}>{task.type}</span>
                                    </div>
                                    <span>{task.receiptDate}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>


            </div>
        </>);
    }
}

export default ManageAllMissions;