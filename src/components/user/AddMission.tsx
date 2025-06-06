import type { FunctionComponent } from "react";
import style from '../../style/addMission/addMission.module.css';

interface AddMissionProps {
    oncloseAddMission: (closeBool: boolean) => void
}

const AddMission: FunctionComponent<AddMissionProps> = ({ oncloseAddMission }) => {


    return (<>

        <div className={style.warpper_form}>

            <div id={style.AddMissionTitle}>Add Mission</div>

            <form>

                <div className={style.add_mission_form}>
                    <div className={style.field_wrapper} id={style.titleWrapper}>
                        <label>Title : </label>
                        <input type="text" />
                    </div>

                    <div className={style.field_wrapper} id={style.subTitleWrapper}>
                        <label>Sub Title : </label>
                        <input type="text" />
                    </div>

                    <div className={style.field_wrapper} id={style.descriptionWrapper}>
                        <label>Description : </label>
                        <textarea />
                    </div>


                    <div className={style.field_wrapper} id={style.endDateWrapper}>
                        <label>end Date : </label>
                        <input type="date" />
                    </div>

                    <div className={style.field_wrapper} id={style.startDateWrapper}>
                        <label>start Date : </label>
                        <input type="date" />
                    </div>


                    <div className={style.field_wrapper} id={style.typeWrapper}>
                        <label>Type : </label>
                        <select>
                            <option value="">אישית</option>
                            <option value="">קבוצתית</option>
                            <option value="">מנהל</option>
                        </select>
                    </div>
                </div>

                <div className={style.btns_add_mission_container} id={style.containerBtnsFormAddMission}>
                    <button className="add_mission_btn" id={style.btnAddMission} type="button">Add</button>
                    <button className="reset_btn" id={style.btnReset} type="reset">reset</button>
                    <button
                        className="close_popUp_btn"
                        id={style.btnclosePopUp}
                        type="button"
                        onClick={() => oncloseAddMission(false)}>close
                    </button>
                </div>
            </form>
        </div>
    </>);
}

export default AddMission;