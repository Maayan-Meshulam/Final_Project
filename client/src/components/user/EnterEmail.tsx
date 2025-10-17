import { useEffect, useState, type FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, patchPass, sendEmail } from "../../services/userService";
import { errorMessage, successMessage } from "../../toastify/toastifyService";


interface EnterEmailProps {

}

const EnterEmail: FunctionComponent<EnterEmailProps> = () => {

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
        const email = e.target.email.value;

        getUserByEmail(email)
            .then(res => {
                id = res.data._id

                sendEmail(email, id, -1)
                    .then(res => {
                      successMessage("אימייל נשלח")
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
            <div className="btn_back" onClick={() => nav(+1)}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="btn_forword" onClick={() => nav(-1)}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>


            <h1 className="main_title">שליחת אימייל</h1>

            <form className="form_sendingEmail" id="form" onSubmit={handleSubmit}>
                <div>
                    <label>אימייל</label>
                    <input
                        type="email"
                        id="email"
                        className="inputs"
                        onInput={(e: any) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    className="buttonSendEmail"
                    disabled={!errorSamePass || !dirtyForm}
                >שלח</button>
            </form>
        </div>

    </>);
}

export default EnterEmail;