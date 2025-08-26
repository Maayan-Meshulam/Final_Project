import { useFormik } from "formik";
import type { FunctionComponent } from "react";
import { taskSchema } from "../../validation/task/taskValidator";
import * as Yup from 'yup';
import { addTask } from "../../services/tasksService";
import style from '../../style/addMission/addMission.module.css';
import CreateInputs from "./CreateInputs";
import CreateSelects from "./CreateSelects";


interface updateTaskProps {
    oncloseAddMission: (closeBool: boolean) => void
}
 
const updateTask: FunctionComponent<updateTaskProps> = ({oncloseAddMission}) => {
 
    const task = {
        title: "",
        subTitle: "",
        description:"",
        deadLine:"",
        receiptDate: "",
        type: "",
    };

    const formik = useFormik({
        initialValues: {
            title: task.title,
            subTitle: task.subTitle,
            description: task.description,
            deadLine: task.deadLine,
            receiptDate: task.receiptDate,
            type: task.type,
        },
        enableReinitialize:true,
        validationSchema: Yup.object(taskSchema),
        onSubmit: (values) => {
            console.log("values" + values);
            addTask(values)
                .then(res => {
                    console.log(res.data);
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
                    <CreateInputs id="description" name="תיאור" formik={formik} />
                    <CreateInputs type="Date" id="deadline" name="תאריך סיום" formik={formik} />
                    <CreateInputs type="Date" id="receiptDate" name="תאריך קבלה" formik={formik} />

                    <CreateSelects id="type" name="סוג" formik={formik}>
                        <option value="1">אישית</option>
                        <option value="2">מנהל</option>
                    </CreateSelects>

                    <CreateSelects id="workerTaskId" name="עובד משויך" formik={formik}>
                        <option value="0">ללא</option>
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
    </> );
}
 
export default updateTask;