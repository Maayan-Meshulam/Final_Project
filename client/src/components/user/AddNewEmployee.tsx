import type { FunctionComponent } from "react";
import style from '../../style/addEmployee/addEmployee.module.css';
import { useFormik } from "formik";
import CreateInputs from "./CreateInputs";
import CreateSelects from "./CreateSelects";
import { addUser } from "../../services/userService";
import normaliztionUser from "../../helpers/normalizeUser";
import { userRegisterValidation } from "../../validation/user/userValidation";
import * as Yup from 'yup'

interface AddNewEmployeeProps {
    oncloseAddNewEmployee: (NewEmployeesCloseBoll: boolean) => void
}

const AddNewEmployee: FunctionComponent<AddNewEmployeeProps> = ({ oncloseAddNewEmployee }) => {

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            birthDay: "",
            imageUrl: "",
            alt: "",
            city: "",
            street: "",
            houseNumber: "",
            zip: "",
            startDate: "",
            role: "",
            jobType: "",
            fromWhereWorking: "",
            managerName: "",
            department: "",
            team: "",
            managerLevel: "",
        },
        validationSchema: Yup.object(userRegisterValidation),
        onSubmit: (values: any) => {
            console.log(JSON.stringify(values));
            const userNomalize = normaliztionUser(values)
            console.log(JSON.stringify(userNomalize) + "****");
            
            addUser(userNomalize)
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

        <div className="container_popUp">

            <h4>Add Employee</h4>

            <form className={style.warpper_form} onSubmit={formik.handleSubmit}>
                <div className={style.inline_form_wrapper}>

                    <fieldset id={style.PersonalDetails}>
                        <legend>פרטים איישים</legend>
                        <CreateInputs type="text" id="firstName" name="first name" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="text" id="lastName" name="last name" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="date" id="birthDay" name="birthDay" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="tel" id="phone" name="phone number" formik={formik} classAddEmployess={style.field_wrapper} />
                        <CreateInputs type="file" id="imageUrl" name="personal image" formik={formik} classAddEmployess={style.field_wrapper} />
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

                        <CreateSelects id="managerLevel" name="managerLevel" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="0">0 - regular worker</option>
                            <option value="1">1 - entry manager</option>
                            <option value="1">2 - senior manager</option>
                        </CreateSelects>

                        <CreateSelects id="managerName" name="Manager name" formik={formik} classAddEmployess={style.field_wrapper}>
                            <option value="moshe">moshe</option>
                            <option value="david">david</option>
                            <option value="ronen">ronen</option>
                        </CreateSelects>
                    </fieldset>

                    <select multiple id="connectedEmployess" name="connected Employees" className={style.field_wrapper}>
                      <option value="moshe">moshe</option>
                            <option value="david">david</option>
                            <option value="ronen">ronen</option>
                    </select>

                    <div className={style.field_wrapper}>
                        <label>comments : </label>
                        <textarea />
                    </div>
                </div>

                <div className={style.btns_add_mission_container} id={style.containerBtnsFormAddMission}>
                    <button className="add_mission_btn" id={style.btnAddMission} type="submit">Add</button>
                    <button className="reset_btn" id={style.btnReset} type="reset">reset</button>
                    <button
                        className="close_popUp_btn"
                        id={style.btnclosePopUp}
                        type="button"
                        onClick={() => oncloseAddNewEmployee(false)}>close
                    </button>
                </div>
            </form>
        </div>    </>);
}

export default AddNewEmployee;