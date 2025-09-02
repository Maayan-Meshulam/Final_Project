import type { FunctionComponent } from "react";

interface CreateInputsProps {
    type?: string,
    id: string,
    name: string
    formik: any,
    placeholder?: string,
    classAddEmployess?: any
}

const CreateInputs: FunctionComponent<CreateInputsProps> = ({ formik, type, name, id, classAddEmployess }) => {
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
                    className="form-control"
                />
            </div>

            <p>{formik.touched[id] && formik.errors[id]}</p>
        </div>
    </>);
}

export default CreateInputs;