import type { FunctionComponent } from "react";
import style from '../../style/addEmployee/addEmployee.module.css';

interface AddNewEmployeeProps {
    oncloseAddNewEmployee: (NewEmployeesCloseBoll: boolean) => void
}

const AddNewEmployee: FunctionComponent<AddNewEmployeeProps> = ({ oncloseAddNewEmployee }) => {
    return (<>

        <div className="container_popUp">

            <h4>Add Employee</h4>

            <form className={style.warpper_form}>
                <div className={style.inline_form_wrapper}>

                    <fieldset id={style.PersonalDetails}>
                        <legend>פרטים איישים</legend>
                        <div className={style.field_wrapper}>
                            <label>first name : </label>
                            <input type="text" />
                        </div>

                        <div className={style.field_wrapper}>
                            <label>last name : </label>
                            <input type="text" />
                        </div>

                        <div className={style.field_wrapper} >
                            <label>birthday : </label>
                            <input type="date" />
                        </div>

                        <div className={style.field_wrapper}>
                            <label>phone number : </label>
                            <input type="text" />
                        </div>

                        <div className={style.field_wrapper}>
                            <label>url - personal image: </label>
                            <input type="file" />
                        </div>

                    </fieldset>

                    <fieldset id={style.address}>
                        <legend>כתובת</legend>
                        <div className={style.field_wrapper} >
                            <label>city : </label>
                            <select>
                                <option value="">ירולשים</option>
                                <option value="">כפר סבא</option>
                                <option value="">הרצליה</option>
                            </select>
                        </div>

                        <div className={style.field_wrapper}>
                            <label>street : </label>
                            <select>
                                <option value="">בן גוריון</option>
                                <option value="">ויצמן</option>
                                <option value="">רוטשילד</option>
                            </select>
                        </div>

                        <div className={style.field_wrapper} >
                            <label>house Number :</label>
                            <input type="number" />
                        </div>

                        <div className={style.field_wrapper} >
                            <label>zip :</label>
                            <input type="number" />
                        </div>
                    </fieldset>

                    <fieldset id={style.loginDetails}>
                        <legend>פרטי התחברות</legend>
                        <div className={style.field_wrapper}>
                            <label>email : </label>
                            <input type="text" />
                        </div>

                        <div className={style.field_wrapper}>
                            <label>password : </label>
                            <input type="text" />
                        </div>
                    </fieldset>

                    <fieldset id={style.workingDetails}>
                        <legend className={style.legendClass}>פרטי עבודה</legend>

                        <div className={style.field_wrapper}>
                            <label>start Day :</label>
                            <input type="date" />
                        </div>

                        <div className={style.field_wrapper}>
                            <label>Job : </label>
                            <select>
                                <option value="">full stack developer</option>
                                <option value="">backEnd developer</option>
                                <option value="">QA</option>
                            </select>
                        </div>

                        <div className={style.field_wrapper}>
                            <label>Job type : </label>
                            <select>
                                <option value="">full job</option>
                                <option value="">half job</option>
                                <option value="">other</option>
                            </select>
                        </div>

                        <div className={style.field_wrapper}>
                            <label>where working : </label>
                            <select>
                                <option value="">hibridy</option>
                                <option value="">from home</option>
                                <option value="">from office</option>
                            </select>
                        </div>

                        <div className={style.field_wrapper}>
                            <label>type worker : </label>
                            <select>
                                <option value="">regular worker</option>
                                <option value="">manager</option>
                            </select>
                        </div>

                        <div className={style.field_wrapper}>
                            <label>manager name : </label>
                            <select>
                                <option value="">moshe</option>
                                <option value="">david</option>
                                <option value="">ronen</option>
                            </select>
                        </div>
                    </fieldset>

                    <div className={style.field_wrapper}>
                        <label>comments : </label>
                        <textarea />
                    </div>
                </div>

                <div className={style.btns_add_mission_container} id={style.containerBtnsFormAddMission}>
                    <button className="add_mission_btn" id={style.btnAddMission} type="button">Add</button>
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