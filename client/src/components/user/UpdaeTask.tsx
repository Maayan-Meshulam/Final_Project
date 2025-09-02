import { useFormik } from "formik";
import type { FunctionComponent } from "react";
import { taskSchema } from "../../validation/task/taskValidator";
import * as Yup from 'yup';
import { updatedTask } from "../../services/tasksService";
import style from '../../style/addMission/addMission.module.css';
import CreateInputs from "./CreateInputs";
import CreateSelects from "./CreateSelects";
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../services/tokenService";


interface updateTaskProps {
    oncloseUpdating: (closeBool: boolean) => void
    task: any,
    onToggleUetUpdaedTask: (state: boolean) => void
}

const updateTask: FunctionComponent<updateTaskProps> = ({ oncloseUpdating, task, onToggleUetUpdaedTask }) => {

    const userInfo = useSelector((state: any) => state.userBaseInfo)

    console.log(userInfo.id);

    console.log(task._id + "      999999999999999");
    console.log(JSON.stringify(task));


    const formik = useFormik({
        initialValues: {
            title: task.title,
            subTitle: task.subTitle,
            description: task.description,
            deadLine: task.deadLine,
            receiptDate: task.receiptDate,
            type: task.type,
            status: task.status,
            workerTaskId: task.workerTaskId == userInfo.id ? "0" : task.workerTaskId
        },
        enableReinitialize: true,
        validationSchema: Yup.object(taskSchema),
        onSubmit: (values) => {
            const token = getTokenInStorage() as string;
            updatedTask(values, task._id, token)
                .then(res => {
                    formik.resetForm();
                    oncloseUpdating(false);
                    onToggleUetUpdaedTask((prev: boolean) => !prev);
                })
                .catch(error => console.log(error));
        }
    });

    console.log(formik);

    return (<>

        <div className={style.warpper_form}>

            <div id={style.AddMissionTitle}>update task</div>

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
                        <option value="0">ללא</option>
                        <option value="68a772a8257f9f74a63016c7">maayan</option>
                        <option value="68a84d999840ec7dc79fc96e">rotem</option>
                        <option value="68a8707693357413756cf287">hadar</option>
                    </CreateSelects>
                </div>

                <div className={style.btns_add_mission_container} id={style.containerBtnsFormAddMission}>
                    <button
                        className="add_mission_btn"
                        id={style.btnAddMission}
                        type="submit">update
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
                        onClick={() => oncloseUpdating(false)}>close
                    </button>
                </div>
            </form>
        </div>
    </>);
}

export default updateTask;