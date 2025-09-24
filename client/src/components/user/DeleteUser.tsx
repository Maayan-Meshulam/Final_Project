import { useState, type FunctionComponent } from "react";
import { getTokenInStorage } from "../../services/tokenService";
import { deleteUser } from "../../services/userService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface DeleteUserProps {
    onCloseDeleting: any,
    user: any,
}

const DeleteUser: FunctionComponent<DeleteUserProps> = ({ onCloseDeleting, user }) => {

    const nav = useNavigate();

    return (<>
        <div style={{ backgroundColor: "gray", position: "absolute", left:"50%" }}>
            <h3>Are you sure you want to delete this user ?</h3>
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

            <button type="button" onClick={() => {
                const token = getTokenInStorage() as string;
                deleteUser(user._id, token)
                    .then(res => {
                        onCloseDeleting(false);
                        nav('/users/manageEmployess');
                    })
                    .catch(err => console.log(err));
            }}>
                delete
            </button>

            <button type="button" onClick={() => {
                onCloseDeleting(false);
            }}>
                close
            </button>
        </div>
    </>);
}

export default DeleteUser;