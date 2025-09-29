import { useEffect, useState, type FunctionComponent } from "react";
import { patchPass } from "../../services/userService";
import { getTokenInStorage } from "../../services/tokenService";
import { useNavigate } from "react-router-dom";

interface ChangePasswordProps {

}

const ChangePassword: FunctionComponent<ChangePasswordProps> = () => {

    const style: {
        form: React.CSSProperties;
        inline_form: React.CSSProperties;
        button: React.CSSProperties;
        inputs: React.CSSProperties;
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
        }
    };

    const [password, setPassword] = useState<string>("");
    const [verPassword, setVerPassword] = useState<string>("");
    const [errorSamePass, setErrorSamePass] = useState<boolean>(true);
    const [dirtyForm, setDirtyForm] = useState<boolean>(false);

    const token = getTokenInStorage();
    const nav = useNavigate()


    useEffect(() => {
        setErrorSamePass(password === verPassword);
        (password == "" && verPassword == "") ? setDirtyForm(false) : setDirtyForm(true)
    }, [password, verPassword])

    const handleSubmit = (values: any) => {
        console.log(values);
        patchPass(token as string, values.password)
        .then(res=>{
            console.log(res.data);
            nav("/users/login");
        })
        .catch(err=>console.log(err))
    }

    return (<>
        <div className="container">
            <form style={style.form} id="form" onSubmit={handleSubmit}>
                <div style={style.inline_form}>
                    <label>סיסמא חדשה</label>
                    <input
                        type="password"
                        id="password"
                        style={style.inputs}
                        onInput={(e: any) => setPassword(e.target.value)}
                    />
                </div>

                <div style={style.inline_form}>
                    <label>אימות סיסמא</label>
                    <input
                        type="password"
                        id="verpassword"
                        style={style.inputs}
                        onInput={(e: any) => setVerPassword(e.target.value)}
                    />
                    {!errorSamePass && <p>סיסמאות לא תואמות</p>}
                </div>
                <button
                    style={style.button}
                    disabled={!errorSamePass || !dirtyForm}
                >שלח</button>
            </form>
        </div>
    </>);

}

export default ChangePassword;