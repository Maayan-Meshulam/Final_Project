import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';
import AddMission from "../user/AddMission";
import { getMyCards } from "../../services/tasksService";
import { boolean } from "yup";

interface ManageAllMissionsProps {

}

const ManageAllMissions: FunctionComponent<ManageAllMissionsProps> = () => {

    const [displayAddMission, setDisplayAddMission] = useState<boolean>(false);
    const [toggleAllMyTasks, setToggleAllMyTasks] = useState<boolean>(false);
    const [allMyTasks, setAllMyTasks] = useState<any>([]);

    //בטעינה ראשונית / כשיש שינוי במערך המשימות
    useEffect(() => { 
        getMyCards()
        .then(res=>{
            console.log(res.data);
            setAllMyTasks(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    }, [toggleAllMyTasks]);


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
                        allMyTasks ?? 
                    }

                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>ממתינה</span>
                            <span id={style.typeMission}>אישית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>ממתינה</span>
                            <span id={style.typeMission}>קבוצתית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>בתהליך</span>
                            <span id={style.typeMission}>מנהל</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>בוצעה</span>
                            <span id={style.typeMission}>אישית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>ממתינה</span>
                            <span id={style.typeMission}>אישית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>ממתינה</span>
                            <span id={style.typeMission}>קבוצתית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>בתהליך</span>
                            <span id={style.typeMission}>מנהל</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>בוצעה</span>
                            <span id={style.typeMission}>אישית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>ממתינה</span>
                            <span id={style.typeMission}>אישית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>ממתינה</span>
                            <span id={style.typeMission}>קבוצתית</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                    <div className={style.preview_mission}>
                        <h5>שם המשימה</h5>
                        <div>
                            <span id={style.statusMission}>בתהליך</span>
                            <span id={style.typeMission}>מנהל</span>
                        </div>
                        <span>13/12/2025</span>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ManageAllMissions;