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

    const style: {
        form: React.CSSProperties;
        inline_form: React.CSSProperties;
        button: React.CSSProperties;
        inputs: React.CSSProperties;
        top_btns_form: React.CSSProperties,
        btnclosePopUp: React.CSSProperties
    } = {
        form: {
            direction: "rtl",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: "50%",
            left: "50%",
            gap: "20px",
            transform: "translate(-50%, -50%)",
            border: "1px solid gray",
            padding: "35px",
            borderRadius: "10px",
            zIndex: 1500,
            backgroundColor: "lightgray"
        },
        inline_form: {
            display: "flex",
            flexDirection: "column",
        },
        button: {
            width: "100%",
            padding: "5px",
            border: "1px solid green",
            borderRadius: "10px",
            backgroundColor: "green",
            color: "white",
            marginTop: "20px"
        },
        inputs: {
            width: "100%",
            padding: "5px",
            borderRadius: "10px",
            border: "1px solid gray"
        },
        top_btns_form: {
            position: "absolute",
            right: "15px",
            top: "15px",
            display: "flex",
            gap: "5px"
        },
        btnclosePopUp: {
            border: "none",
            backgroundColor: "inherit"
    }

};

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
    console.log(e);
    const email = e.target.email.value;
    console.log(email);

}

return (<>

    <form style={style.form} id="form" onSubmit={handleSubmit}>
        <div style={style.top_btns_form}>
            <button
                className="close_popUp_btn"
                style={style.btnclosePopUp}
                type="button"
                onClick={() => onclosecode(false)}
            >&#10060;</button>

        </div>
        <div style={style.inline_form}>
            <label>הזן קוד </label>
            <input
                type="number"
                id="code"
                style={style.inputs}
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