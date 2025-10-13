import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface ErrorPremissionProps {

}

const ErrorPremission: FunctionComponent<ErrorPremissionProps> = () => {

    const nav = useNavigate();


    return (<>
        <div className="container">
            <div style={{ marginTop: "150px", marginBottom: "80px", textAlign: "center" }}>
                <h1>אין הראשות לביצוע פעולה זו </h1>
                <h3>403</h3>
                <div>
                    <button style={{
                        padding: " 7px",
                        border: "1px solid green",
                        borderRadius: "10px",
                        backgroundColor: "green",
                        color: "white"
                    }}>login page</button>
                    <button className="btn_back"
                        onClick={() => nav(-1)}
                        style={{
                            position: "static"
                        }}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

        </div>
    </>);
}

export default ErrorPremission;