import { useState, type FunctionComponent } from "react";
import { getTokenInStorage } from "../../services/tokenService";
import { deleteUser } from "../../services/userService";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import style from '../../style/addMission/addMission.module.css';


interface DeleteUserProps {
    onCloseDeleting: any,
    user: any,
    onToggleCloseDeleting?:any
}

const DeleteUser: FunctionComponent<DeleteUserProps> = ({ onCloseDeleting, user, onToggleCloseDeleting }) => {

    const nav = useNavigate();
    const {id} = useParams()

    return (<>
        <div className={style.warpper_form}>
            <button
                className="close_popUp_btn"
                id={style.btnclosePopUp}
                type="button"
                onClick={() => onCloseDeleting(false)}
            >&#10060;</button>

            <h3 style={{ color: "red" }}>אתה בטוחה שברצונך למחוק משימה זו ?</h3>
            <br /><br />

            <div>
                <h1>{user.name.first} {user.name.last}</h1>
                <h3>{user.role}</h3>
                <p>{user.phone} {user.email}</p>
                <p>{user.birthDay}</p>
                <p>{user.address.city}, {user.address.street}, {user.address.houseNumber}, {user.address.zip}</p>
                <p>{user.startDate}</p>
                <p>{user.jobType}, {user.fromWhereWorking}</p>
                <p>{user.directManager}</p>
                <p>{user.department}, {user.team}</p>
                <p>{user.managerLevel}</p>
                <p>{user.connectedEmployess}</p>

            </div>

            <button type="submit" id={style.btnAddMission} className={style.add_task_btn}
                onClick={() => {
                    const token = getTokenInStorage() as string
                    deleteUser(user._id as string, user.directManager, token)
                        .then(res => {
                            onCloseDeleting(false);
                            // onToggleCloseDeleting((prev:any)=>!prev);
                            window.location.reload()
                            if(id) nav(-1);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }}>
                delete
            </button>
        </div>
    </>);
}

export default DeleteUser;