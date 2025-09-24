import { useFormik } from "formik";
import { useEffect, useState, type FunctionComponent } from "react";
import { taskSchema } from "../../validation/task/taskValidator";
import * as Yup from 'yup';
import { updatedTask } from "../../services/tasksService";
import style from '../../style/addMission/addMission.module.css';
import CreateInputs from "./CreateInputs";
import CreateSelects from "./CreateSelects";
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../services/tokenService";
import { getAllUsers } from "../../services/userService";


interface UpdateTaskProps {
    oncloseUpdating: any
    task: any,
}

const UpdateTask: FunctionComponent<UpdateTaskProps> = ({ oncloseUpdating, task }) => {

    const userInfo = useSelector((state: any) => state.userBaseInfo)
    console.log(userInfo.id + " user id" + userInfo.managerLevel);

    const [arrEmployess, setArrEmployess] = useState<any>([]);
    const token = getTokenInStorage() as string;


    useEffect(() => {
        //רק במידה והוא מנהל נבקש את כל המשתמשים
        if (userInfo.managerLevel > 0) {
            getAllUsers(userInfo.connectedEmployess, token)
                .then(res => {
                    setArrEmployess(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            title: task.title,
            subTitle: task.subTitle,
            description: task.description,
            deadLine: task.deadLine,
            receiptDate: task.receiptDate,
            type: task.type,
            status: task.status,
            priority: task.priority,
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
                    // onToggleUetUpdaedTask((prev: boolean) => !prev);
                    window.location.reload();
                })
                .catch(error => console.log(error));
        }
    });

    console.log(formik);

    return (<>

        <div className={style.warpper_form}>

            <div className={style.add_task_title}>update Mission</div>

            <form onSubmit={formik.handleSubmit} className={style.add_mission_form}>

                <div className={style.top_btns_form}>
                    <button
                        id={style.btnclosePopUp}
                        type="button"
                        onClick={() => {
                            oncloseUpdating(false);
                            // window.location.reload()
                        }}
                    >&#10060;</button>

                    <button
                        className={style.reset_btn}
                        type="button"
                        onClick={() => { formik.resetForm() }}
                    >&#8635;</button>
                </div>

                <div className={style.add_mission_form}>
                    <CreateInputs type="text" id="title" name="כותרת ראשית" formik={formik} />
                    <CreateInputs type="text" id="subTitle" name="כותרת משנית" formik={formik} />
                    <CreateInputs type="text" id="description" name="תיאור" formik={formik} />
                    <CreateInputs type="Date" id="deadLine" name="תאריך סיום" formik={formik} />
                    <CreateInputs type="Date" id="receiptDate" name="תאריך קבלה" formik={formik} />

                    <div className={style.inlineFormDiv}>
                        <CreateSelects id="type" name="סוג" formik={formik}>
                            <option value="1">אישית</option>
                            <option value="2">מנהל</option>
                        </CreateSelects>


                        <CreateSelects id="status" name="סטטוס" formik={formik}>
                            <option value="1">בטיפול</option>
                            <option value="2">בוצע</option>
                        </CreateSelects>

                        <CreateSelects id="priority" name="דחיפות" formik={formik}>
                            <option value="0" className={style.priorityOption}>ללא</option>
                            <option value="1" className={style.priorityOption}>נמוך</option>
                            <option value="2" className={style.priorityOption}>בינוני</option>
                            <option value="3" className={style.priorityOption}>גבוה</option>
                            <option value="4" className={style.priorityOption}>גבוה מאוד</option>
                        </CreateSelects>


                        {userInfo.managerLevel > 0 &&
                            <CreateSelects id="workerTaskId" name="עובד משויך" formik={formik}>
                                <option value="0">ללא</option>

                                {arrEmployess.length > 0 && arrEmployess.map((epmloyee: any) => (
                                    <option value={epmloyee._id}>
                                        {epmloyee.name.first}{epmloyee.name.last}
                                    </option>
                                ))}
                            </CreateSelects>
                        }
                    </div>
                </div>

                <div className={style.btns_add_mission_container} id={style.containerBtnsFormAddMission}>
                    <button
                        className={style.add_task_btn}
                        id={style.btnAddMission}
                        type="submit">update
                    </button>
                </div>
            </form>
        </div>
    </>);
}

export default UpdateTask;