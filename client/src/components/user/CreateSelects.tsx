import type { FunctionComponent, ReactNode } from "react";

interface CreateSelectsProps {
    id: string,
    name: string
    formik: any,
    children: ReactNode

}

const CreateSelects: FunctionComponent<CreateSelectsProps> = ({ formik, name, id, children }) => {
    return (<>
        <div>
            <label>{name} </label>
            <select
                id={id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>

                {children}
            </select>

            <p>{formik.touched[id] && formik.errors[id]}</p>
        </div>


    </>);
}

export default CreateSelects;