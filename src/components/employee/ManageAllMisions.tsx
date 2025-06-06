import { useState, type FunctionComponent } from "react";
import style from '../../style/previewMission/preivewDiaplayMission.module.css';
import AddMission from "../manager/AddMission";

interface ManageAllMissionsProps {

}

const ManageAllMissions: FunctionComponent<ManageAllMissionsProps> = () => {

    const [displayAddMission, setDisplayAddMission] = useState<boolean>(false);

    return (<>
        <div className={style.container_page}>

            <div onClick={()=>setDisplayAddMission(true)}>Add Mission</div>
            {displayAddMission && <AddMission oncloseAddMission={setDisplayAddMission}/>}

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