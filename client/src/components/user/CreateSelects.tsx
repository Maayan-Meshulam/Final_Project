import type { FunctionComponent, ReactNode } from "react";

interface CreateSelectsProps {
    id: string,
    name: string
    formik: any,
    children: ReactNode,
    classAddEmployess?: any

}

const CreateSelects: FunctionComponent<CreateSelectsProps> = ({ formik, name, id, classAddEmployess, children }) => {
    return (<>
        <div className={classAddEmployess}>
            <label>{name} </label>
            <select
                id={id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                <option value="">בחר</option>
                {children}
            </select>

            <p>{formik.touched[id] && formik.errors[id]}</p>
        </div>


    </>);
}

export default CreateSelects;