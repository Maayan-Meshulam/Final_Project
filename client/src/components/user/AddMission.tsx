import { useEffect, useRef, useState, type FunctionComponent } from "react";
import style from '../../style/addMission/addMission.module.css';
import { useFormik, type FormikFormProps } from 'formik';
import CreateInputs from "./CreateInputs.js";
import CreateSelects from "./CreateSelects.js";
import * as Yup from 'yup';
import { taskSchema } from "../../validation/task/taskValidator.js";
import { addTask } from "../../services/tasksService.js";
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../services/tokenService.js";
import { getAllUsers } from "../../services/userService.js";
import ErrorPremission from "../layot/ErrorPremission.js";
import { errorMessage, successMessage } from "../../toastify/toastifyService.js";



interface AddMissionProps {
    oncloseAddMission: (closeBool: boolean) => void,
    onToggleAllMyTasks?: any
}

const AddMission: FunctionComponent<AddMissionProps> = ({ oncloseAddMission, onToggleAllMyTasks }) => {

    //פרטי המשתמש המחובר - שמור בחנות
    const user = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(user) + "  from add task");

    const token = getTokenInStorage() as string

    const [arrEmployess, setArrEmployess] = useState<any>([]);
    // let priority = useRef<any>("");

    // const priorityRefStyle = (targetDiv: any) => {
    //     console.log(targetDiv);
    //     const arrChildrens = document.getElementById("priorityContainer")?.childNodes;
    //     for (let i = 0; i < arrChildrens?.length; i++) {
    //         if (targetDiv.value == i){
    //             targetDiv.id = style[`${i}priority`]
    //         }
    //         else{
    //             targetDiv.id = "";
    //         }
    //     }
    // }

    console.log(typeof user.id + " ypeeee");


    useEffect(() => {
        if (user.managerLevel > 0) {
            console.log(user.connectedEmployess + "7090909000000000000000000");

            getAllUsers(user.connectedEmployess, token)
                .then((res: any) => {
                    console.log(JSON.stringify(res.data) + "......................");
                    setArrEmployess(res.data);
                    return res.data;
                })
                .catch(error => errorMessage(error.message))
        }
    }, []);


    const formik = useFormik({
        initialValues: {
            title: "",
            subTitle: "",
            description: "",
            deadLine: "",
            receiptDate: "",
            type: "",
            status: "",
            workerTaskId: "0",
            priority: "",
            star: 0
        },
        enableReinitialize: true,
        validationSchema: Yup.object(taskSchema),
        onSubmit: (values) => {
            console.log("in on submit add task");

            console.log("values" + JSON.stringify(values));
            addTask(values, token)
                .then(res => {
                    console.log("נוסףףףףף");

                    console.log(res.data);
                    // if (onToggleAllMyTasks) onToggleAllMyTasks((prev: boolean) => !prev);
                    oncloseAddMission(false);
                    // window.location.reload();
                    formik.resetForm();
                    successMessage("משימה נוספה בהצלחה !")
                })
                .catch(error => error.response ? errorMessage(error.response.data)
                    : errorMessage("שגיאה כללית -לא נשלחה בקשה"));
        }
    });

    console.log(formik);


    return (<>

        <div className={style.warpper_form}>

            <div className={style.add_task_title}>Add Mission</div>

            <form onSubmit={formik.handleSubmit} className={style.add_mission_form}>

                <div className={style.top_btns_form}>
                    <button
                        className="close_popUp_btn"
                        id={style.btnclosePopUp}
                        type="button"
                        onClick={() => oncloseAddMission(false)}
                    >&#10060;</button>

                    <button
                        className={style.reset_btn}
                        type="button"
                        onClick={() => { formik.resetForm() }}
                    >&#8635;</button>
                </div>

                <CreateInputs type="text" id="title" name="כותרת ראשית" formik={formik} />
                <CreateInputs type="text" id="subTitle" name="כותרת משנית" formik={formik} />
                <CreateInputs type="text" id="description" name="תיאור" formik={formik} />
                <div className={style.inlineFormDiv}>
                    <CreateInputs type="Date" id="deadLine" name="תאריך סיום" formik={formik} />
                    <CreateInputs type="Date" id="receiptDate" name="תאריך קבלה" formik={formik} />
                </div>

                {/* <div>
                    <label>רמת דחיפות</label>
                    <div className={style.inlineFormDiv} id="priorityContainer">
                        <div className={`${style.priorityOption} ${style.defaultPriority}`} onClick={() => priority.current = "0"} id={priority.current == "0" ? `${style.nonePriority}` : ""}>
                            ללא
                        </div>
                        <div className={`${style.priorityOption} ${style.defaultPriority}`} onClick={() => priority.current = "1"} id={priority.current == "1" ? `${style.lowPriority}` : ""}>
                            נמוך
                        </div>
                        <div className={`${style.priorityOption} ${style.defaultPriority}`} onClick={() => priority.current = "2"} id={priority.current == "2" ? `${style.middlePriority}` : ""}>
                            בינוני
                        </div>
                        <div className={`${style.priorityOption} ${style.defaultPriority}`} onClick={() => priority.current = "3"} id={priority.current == "3" ? `${style.highPriority}` : ""}>
                            גבוה
                        </div>
                        <div className={`${style.priorityOption} ${style.defaultPriority}`} onClick={() => priority.current = "4"} id={priority.current == "4" ? `${style.veryHighPriority}` : ""}>
                            גבוה מאוד
                        </div>
                    </div>
                </div> */}

                <div className={style.inlineFormDiv}>
                    <CreateSelects id="type" name="סוג" formik={formik}>
                        {user.managerLevel < 1 ? (
                            <option value="1">אישית</option>
                        ) : (
                            <>
                                <option value="1">אישית</option>
                                <option value="2">מנהל</option>
                            </>
                        )}
                    </CreateSelects>



                    <CreateSelects id="priority" name="דחיפות" formik={formik}>
                        <option value="0" className={style.priorityOption}>ללא</option>
                        <option value="1" className={style.priorityOption}>נמוך</option>
                        <option value="2" className={style.priorityOption}>בינוני</option>
                        <option value="3" className={style.priorityOption}>גבוה</option>
                        <option value="4" className={style.priorityOption}>גבוה מאוד</option>
                    </CreateSelects>

                    <CreateSelects id="status" name="סטטוס" formik={formik}>
                        <option value="1">בטיפול</option>
                        <option value="2">בוצע</option>
                    </CreateSelects>


                    <div>
                        <label>עובד משויך</label>
                        <select
                            id="workerTaskId"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.workerTaskId}
                            disabled={user.managerLevel < 1}
                            className={style.formInputs}>
                            <option value="0">ללא</option>
                            {arrEmployess.length > 0 && arrEmployess.map((epmloyee: any) => (
                                <option value={epmloyee._id}>{epmloyee.name.first}{epmloyee.name.last}</option>
                            ))}
                        </select>

                        <p>{formik.touched.workerTaskId && formik.errors.workerTaskId}</p>
                    </div>
                </div>

                <button
                    className={style.add_task_btn}
                    id={style.btnAddMission}
                    type="submit">Add
                </button>


            </form>
        </div>
    </>);
}

export default AddMission;
