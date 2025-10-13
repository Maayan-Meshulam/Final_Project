import type { FunctionComponent } from "react";
import style from '../../style/addMission/addMission.module.css';
import styleEmployee from '../../style/addEmployee/addEmployee.module.css';
import type React from "react";

interface CreateInputsProps {
    type?: string,
    id: string,
    name: string
    formik: any,
    placeholder?: string,
    classAddEmployess?: any
    disabled?:boolean,
}

const CreateInputs: FunctionComponent<CreateInputsProps> = ({ formik, type, name, id, classAddEmployess, disabled}) => {
    return (<>
        <div>
            <div className={`form-floating ${classAddEmployess}`}>

                <label>{name}:</label>
                <input
                    type={type}
                    id={id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[id]}
                    className={`form-control ${style.formInputs} ${styleEmployee.formInputs}`}
                    // disabled = {disabled}
                />
            </div>

            <p>{formik.touched[id] && formik.errors[id]}</p>
        </div>
    </>);
}

export default CreateInputs;