import React, { useEffect, useState, type FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, patchPass, sendEmail } from "../../services/userService";
import UpdateUser from "./UpdateUser";


interface EnterCodeProps {
    codeFromEmail: number,
    user: any,
    onclosecode: any
}

const EnterCode: FunctionComponent<EnterCodeProps> = ({ codeFromEmail, user, onclosecode }) => {

    const [code, setCode] = useState<number>(-1);
const [toggleCode, toggleSetCode] = useState<boolean>(false);
const [isError, setIsError] = useState<boolean>(true);
const [closeUpdating, setCloseUpdating] = useState<boolean>(false)

useEffect(() => {
    setIsError(!(Number(code) == codeFromEmail));
}, [toggleCode])

useEffect(() => {
    if (!isError) {
        // onclosecode(false);
        setCloseUpdating(true)
    }
}, [isError])


const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
}

return (<>

    <form className="form_coding" id="form" onSubmit={handleSubmit}>
        <div className="top_btns_form">
            <button
                className="btnclosePopUp"
                type="button"
                onClick={() => onclosecode(false)}
            >&#10060;</button>

        </div>
        <div className="inline_form">
            <label>הזן קוד </label>
            <input
                type="number"
                id="code"
                className="inputs"
                onInput={(e: any) => {
                    setCode(e.target.value);
                    toggleSetCode((prev: boolean) => !prev)
                }}
            />
            {code != -1 && isError && <p>קוד שגוי</p>}
        </div>
    </form>
    {closeUpdating && <UpdateUser user={user} oncloseUpdating={setCloseUpdating} onclosecode={onclosecode}/>}
</>);
}

export default EnterCode;