import type { FunctionComponent } from "react";

interface CreateInputsProps {
    type?: string,
    id: string,
    name: string
    formik: any,
    placeholder?:string
}

const CreateInputs: FunctionComponent<CreateInputsProps> = ({ formik, type, name, id}) => {
    return (<>
        <div>
            <div className="form-floating">

                <label>{name}:</label>
                <input
                    type={type}
                    id={id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control"
                />
            </div>

            <p>{formik.touched[id] && formik.errors[id]}</p>
        </div>
    </>);
}

export default CreateInputs;