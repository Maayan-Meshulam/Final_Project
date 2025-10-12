import { useEffect, useState, type FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, patchPass, sendEmail } from "../../services/userService";
import { errorMessage } from "../../toastify/toastifyService";


interface EnterEmailProps {

}

const EnterEmail: FunctionComponent<EnterEmailProps> = () => {

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

    const [email, setEmail] = useState<string>("");
    const [errorSamePass, setError] = useState<boolean>(true);
    const [dirtyForm, setDirtyForm] = useState<boolean>(false);
    const rgxEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const nav = useNavigate();

    let id = "";

    useEffect(() => {
        setError(rgxEmail.test(email));
        (email == "") ? setDirtyForm(false) : setDirtyForm(true)
    }, [email])


    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(e);
        const email = e.target.email.value;
        console.log(email);

        getUserByEmail(email)
            .then(res => {
                console.log(res.data + "1111111");
                id = res.data._id

                sendEmail(email, id, -1)
                    .then(res => {
                        console.log(res.data);
                        console.log("look at your email to reset your password !!");
                    })
                    .catch(error => error.response ? errorMessage(error.response.data)
                        : errorMessage("שגיאה כללית -לא נשלחה בקשה"));
            })
            .catch(() => {
                errorMessage("אימייל שגוי / משתמש לא רשום")
            })
    }

    return (<>
        <div className="container">
            <div className="btn_back" onClick={() => nav(-1)}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>

            <h1 className="main_title">שליחת אימייל</h1>

            <form style={style.form} id="form" onSubmit={handleSubmit}>
                <div style={style.inline_form}>
                    <label>אימייל</label>
                    <input
                        type="email"
                        id="email"
                        style={style.inputs}
                        onInput={(e: any) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    style={style.button}
                    disabled={!errorSamePass || !dirtyForm}
                >שלח</button>
            </form>
        </div>

    </>);
}

export default EnterEmail;