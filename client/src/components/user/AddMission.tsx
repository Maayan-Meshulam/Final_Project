import type { FunctionComponent } from "react";
import style from '../../style/addMission/addMission.module.css';
import { useFormik } from 'formik';
import CreateInputs from "./CreateInputs.js";
import CreateSelects from "./CreateSelects.js";
import * as Yup from 'yup';
import { taskSchema } from "../../validation/task/taskValidator.js";
import { addTask } from "../../services/tasksService.js";
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../services/tokenService.js";



interface AddMissionProps {
    oncloseAddMission: (closeBool: boolean) => void,
    onToggleAllMyTasks: (toggleMyTasks: boolean) => void
}

const AddMission: FunctionComponent<AddMissionProps> = ({ oncloseAddMission, onToggleAllMyTasks }) => {

    //פרטי המשתמש המחובר - שמור בחנות
    const user = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(user) + "  from add task");

    const token = getTokenInStorage() as string


    const formik = useFormik({
        initialValues: {
            title: "",
            subTitle: "",
            description: "",
            deadLine: "",
            receiptDate: "",
            type: "",
            status: "",
            workerTaskId: ""
        },
        validationSchema: Yup.object(taskSchema),
        onSubmit: (values) => {
            console.log("in on submit add task");

            console.log("values" + JSON.stringify(values));
            addTask(values, token)
                .then(res => {
                    console.log(res.data);
                    onToggleAllMyTasks(true);
                    oncloseAddMission(false);
                    formik.resetForm();
                })
                .catch(error => console.log(error));
        }
    });

    console.log(formik);


    return (<>

        <div className={style.warpper_form}>

            <div id={style.AddMissionTitle}>Add Mission</div>

            <form onSubmit={formik.handleSubmit} >

                <div className={style.add_mission_form}>
                    <CreateInputs type="text" id="title" name="כותרת ראשית" formik={formik} />
                    <CreateInputs type="text" id="subTitle" name="כותרת משנית" formik={formik} />
                    <CreateInputs type="text" id="description" name="תיאור" formik={formik} />
                    <CreateInputs type="Date" id="deadLine" name="תאריך סיום" formik={formik} />
                    <CreateInputs type="Date" id="receiptDate" name="תאריך קבלה" formik={formik} />

                    <CreateSelects id="type" name="סוג" formik={formik}>
                        <option value="1">אישית</option>
                        <option value="2">מנהל</option>
                    </CreateSelects>


                    <CreateSelects id="status" name="סטטוס" formik={formik}>
                        <option value="1">בטיפול</option>
                        <option value="2">בוצע</option>
                    </CreateSelects>

                    <CreateSelects id="workerTaskId" name="עובד משויך" formik={formik}>
                        <option value="">ללא</option>
                        <option value="1">maayan</option>
                        <option value="2">rotem</option>
                        <option value="3">hadar</option>
                    </CreateSelects>
                </div>

                <div className={style.btns_add_mission_container} id={style.containerBtnsFormAddMission}>
                    <button
                        className="add_mission_btn"
                        id={style.btnAddMission}
                        type="submit">Add
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