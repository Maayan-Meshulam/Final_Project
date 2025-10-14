import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface Error404Props {

}

const Error404: FunctionComponent<Error404Props> = () => {

    const nav = useNavigate();

    return (<>
        <div className="container">
            <div style={{ marginTop: "150px", marginBottom: "80px", textAlign: "center" }}>
                <h1>דף זה אינו קיים</h1>
                <h3>404</h3>
                <div>
                    <button style={{
                        padding: " 7px",
                        border: "1px solid green",
                        borderRadius: "10px",
                        backgroundColor: "green",
                        color: "white"
                    }} onClick={()=>nav('/')}>login page</button>
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

export default Error404;