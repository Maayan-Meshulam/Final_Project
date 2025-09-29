import { useEffect, useState, type FunctionComponent } from "react";
import style from '../../style/addEmployee/addEmployee.module.css';
import { useFormik } from "formik";
import CreateInputs from "./CreateInputs";
import CreateSelects from "./CreateSelects";
import { addUser, getAllUsers, getUserById, patchConnectedEmployees } from "../../services/userService";
// import normaliztionUser from "../../helpers/normalizeUser";
import { userRegisterValidation } from "../../validation/user/userValidation";
import * as Yup from 'yup'
import { getTokenInStorage } from "../../services/tokenService";
import { useSelector } from "react-redux";

interface AddNewEmployeeProps {
    oncloseAddNewEmployee: (NewEmployeesCloseBoll: boolean) => void
}

const AddNewEmployee: FunctionComponent<AddNewEmployeeProps> = ({ oncloseAddNewEmployee }) => {

    const token = getTokenInStorage() as string;
    const userInfo = useSelector((state: any) => state.userBaseInfo);
    const managerId = userInfo.id;
    const [manager, setManager] = useState<any>();
    const [allEmployees, setAllEmployees] = useState<any>([]);


    useEffect(() => {
        getUserById(managerId, token)
            .then(res => {
                const name = `${res.data.name.first} ${res.data.name.last}`;
                console.log(name + " name");
                setManager(name);
            });

        // getAllUsers()
    }, [])



    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            birthDay: "",
            url: "",
            alt: "",
            city: "",
            street: "",
            houseNumber: "",
            zip: "",
            startDate: "",
            role: "",
            jobType: "",
            fromWhereWorking: "",
            directManager: managerId,
            department: "",
            team: "",
            managerLevel: "0",
            connectedEmployess: []
        },
        enableReinitialize: true,
        validationSchema: Yup.object(userRegisterValidation),
        onSubmit: (values: any) => {
            console.log(JSON.stringify(values));
            // const userNomalize = normaliztionUser(values)
            // console.log(JSON.stringify(userNomalize) + "****");

            addUser(values, token)
                .then((res) => {
                    console.log(res.data);
                    oncloseAddNewEmployee(false);
                    formik.resetForm();
                })
                .catch(err => {
                    console.log(err)
                })

        }
    });

    console.log(formik);


    return (<>

        <div className={style.container_popUp}>
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

            <h4>Add Employee</h4>

            <form className={style.warpper_form} onSubmit={formik.handleSubmit}>
                <div className={style.inline_form_wrapper}>

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
                        <CreateInputs type="password" id="password" name="password" formik={formik} classAddEmployess={style.field_wrapper} />

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

                        <div>
                            <CreateSelects id="managerLevel" name="managerLevel" formik={formik} classAddEmployess={style.field_wrapper}>
                                <option value="0">0 - regular worker</option>
                                <option value="1">1 - entry manager</option>
                                <option value="1">2 - senior manager</option>
                            </CreateSelects>
                            <p>על מנת לשייך עובדים למנהל יש ליצור קשר עם אדמין</p>
                        </div>


                        <div>
                            <label>מנהל ישיר</label>
                            <input
                                type="text"
                                id="directManager"
                                name="manager name"
                                value={manager}
                                className={style.field_wrapper}
                                disabled
                            />
                        </div>

                    </fieldset>

                    {/* <select multiple id="connectedEmployess" name="connectedEmployess" className={style.field_wrapper}>
                        {
                            (userInfo.connectedEmployess).map((employee: any) => (
                                <option value={employee}>{employee}</option>
                            ))
                        }
                    </select> */}

                    {/* <div className={style.field_wrapper}>
                        <label>comments : </label>
                        <textarea />
                    </div> */}
                </div>

                <button
                    className={style.add_user_btn}
                    id={style.btnAddMission}
                    type="submit">Add
                </button>

            </form>
        </div>    </>);
}

export default AddNewEmployee;