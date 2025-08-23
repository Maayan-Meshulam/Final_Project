import type { FunctionComponent } from "react";
import style from '../../style/addMission/addMission.module.css';
import { useFormik } from 'formik';
import CreateInputs from "./CreateInputs.js";
import CreateSelects from "./CreateSelects.js";
import * as Yup from 'yup';
import { userSchema } from "../../validation/task/taskValidator.js";


interface AddMissionProps {
    oncloseAddMission: (closeBool: boolean) => void
}

const AddMission: FunctionComponent<AddMissionProps> = ({ oncloseAddMission }) => {

    const formik = useFormik({
        initialValues: {
            title: "",
            subTitle: "",
            description: "",
            deadline: "",
            reciptDate: "",
            type: "",
            workerTaskId: ""
        },
        validationSchema: Yup.object(userSchema),
        onSubmit: (values) => {
            console.log("values" + values);
            
            
        }
    });

    return (<>

        <div className={style.warpper_form}>

            <div id={style.AddMissionTitle}>Add Mission</div>

            <form onSubmit={formik.handleSubmit} >

                <div className={style.add_mission_form}>
                    <CreateInputs type="text" id="title" name="כותרת ראשית" formik={formik} />
                    <CreateInputs type="text" id="subTitle" name="כותרת משנית" formik={formik} />
                    <CreateInputs type="textarea" id="description" name="תיאור" formik={formik} />
                    <CreateInputs type="Date" id="deadline" name="תאריך סיום" formik={formik} />
                    <CreateInputs type="Date" id="recipteDate" name="תאריך קבלה" formik={formik} />

                    <CreateSelects id="type" name="סוג" formik={formik}>
                        <option value="">אישית</option>
                        <option value="">קבוצתית</option>
                        <option value="">מנהל</option>
                    </CreateSelects>

                    <CreateSelects id="workerTaskId" name="עובד משויך" formik={formik}>
                        <option value="">maayan</option>
                        <option value="">rotem</option>
                        <option value="">hadar</option>
                    </CreateSelects>
                </div>

                <div className={style.btns_add_mission_container} id={style.containerBtnsFormAddMission}>
                    <button 
                        className="add_mission_btn" 
                        id={style.btnAddMission} 
                        type="button">Add
                    </button>

                    <button 
                        className="reset_btn" 
                        id={style.btnReset} 
                        type="reset">reset
                    </button>

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