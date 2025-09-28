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
import { getAllUsers, updatingUser } from "../../services/userService";
import { userRegisterValidation } from "../../validation/user/userValidation";
import normaliztionUser from "../../helpers/normalizeUser";


interface UpdateUserProps {
    oncloseUpdating: (closeBool: boolean) => void
    user: any,
}

const UpdateUser: FunctionComponent<UpdateUserProps> = ({ oncloseUpdating, user }) => {

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
            firstName: user.name.first,
            lastName: user.name.last,
            phone: user.phone,
            email: user.email,
            password: user.password,
            birthDay: user.birthDay,
            // url: user.image.url,
            // alt: user.image.alt,
            city: user.address.city,
            street: user.address.street,
            houseNumber: user.address.houseNumber,
            zip: user.address.zip,
            startDate: user.startDate,
            role: user.role,
            jobType: user.jobType,
            fromWhereWorking: user.fromWhereWorking,
            directManager: user.directManager,
            department: user.department,
            team: user.team,
            managerLevel: user.managerLevel,
            connectedEmployess: user.connectedEmployess
        },
        enableReinitialize: true,
        validationSchema: Yup.object(userRegisterValidation),
        onSubmit: (values) => {
            const token = getTokenInStorage() as string;
            updatingUser(user._id, token, values)
                .then(res => {
                    formik.resetForm();
                    oncloseUpdating(false);
                    // window.location.reload()
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
                            // oncloseUpdating(false);
                            window.location.reload()
                        }}
                    >&#10060;</button>

                    <button
                        className={style.reset_btn}
                        type="button"
                        onClick={() => { formik.resetForm() }}
                    >&#8635;</button>
                </div>

                <div className={style.add_mission_form}>

                    <fieldset id={style.PersonalDetails}>
                        <legend>פרטים איישים</legend>
                        <CreateInputs type="text" id="firstName" name="first name" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="text" id="lastName" name="last name" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="date" id="birthDay" name="birthDay" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="tel" id="phone" name="phone number" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="file" id="url" name="personal image" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="text" id="alt" name="alt" formik={formik} classAddEmployess={style.field_wrapper} />
                    </fieldset>

                    <fieldset id={style.address}>
                        <legend>כתובת</legend>
                        <CreateSelects id="city" name="city" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="ירושלים">ירולשים</option>
                            <option value="כפר סבא">כפר סבא</option>
                            <option value="הרצליה">הרצליה</option>
                        </CreateSelects>
                        <CreateSelects id="street" name="street" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="בן גוריון">בן גוריון</option>
                            <option value="ויצמן">ויצמן</option>
                            <option value="רוטשילד">רוטשילד</option>
                        </CreateSelects>

                        <CreateInputs type="number" id="houseNumber" name="house Number" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="number" id="zip" name="zip" formik={formik} classAddEmployess={style.field_wrapper} />
                    </fieldset>

                    <fieldset id={style.loginDetails}>
                        <legend>פרטי התחברות</legend>

                        <CreateInputs type="text" id="email" name="email" formik={formik} classAddEmployess={style.field_wrapper} />
                        {/* <CreateInputs type="password" id="password" name="password" formik={formik} classAddEmployess={style.field_wrapper} /> */}

                    </fieldset>

                    <fieldset id={style.workingDetails}>
                        <legend className={style.legendClass}>פרטי עבודה</legend>
                        <CreateInputs type="date" id="startDate" name="start date" formik={formik} classAddEmployess={style.field_wrapper} />

                        <CreateSelects id="role" name="role" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="full stack developer">full stack developer</option>
                            <option value="backEnd developer">backEnd developer</option>
                            <option value="QA">QA</option>
                        </CreateSelects>

                        <CreateSelects id="department" name="department" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="פיתוח">פיתוח</option>
                            <option value="משאבי אנוש">משאבי אנוש</option>
                            <option value="כלכלה">כלכלה</option>
                        </CreateSelects>

                        <CreateSelects id="jobType" name="job Type" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="משרה מלאה">משרה מלאה</option>
                            <option value="משרה חלקית">משרה חלקית</option>
                            <option value="סטודונט">סטודנט</option>
                        </CreateSelects>

                        <CreateSelects id="team" name="team" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="1">3</option>
                        </CreateSelects>

                        <CreateSelects id="fromWhereWorking" name="from Where Working" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="היבדרידי">היבדרידי</option>
                            <option value="משרד">משרד</option>
                            <option value="בית">בית</option>
                        </CreateSelects>

                        <CreateSelects id="managerLevel" name="managerLevel" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="0">0 - regular worker</option>
                            <option value="1">1 - entry manager</option>
                            <option value="1">2 - senior manager</option>
                        </CreateSelects>
                    </fieldset>

                    <div>
                        <label>מנהל ישיר</label>
                        <input
                            type="text"
                            id="directManager"
                            name="manager name"
                            value={user.directManager}
                            className={style.field_wrapper}
                            disabled
                        />
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

export default UpdateUser;