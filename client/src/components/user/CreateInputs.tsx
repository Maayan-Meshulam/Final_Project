import type { FunctionComponent } from "react";

interface CreateInputsProps {
    type: string,
    id:string,
    name:string
    formik: any

}

const CreateInputs: FunctionComponent<CreateInputsProps> = ({formik,type,name, id}) => {
    return (<>
        <div>
            <label>{name}:</label>
            <input
                type={type}
                id={id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
        </div>
    </>);
}

export default CreateInputs;