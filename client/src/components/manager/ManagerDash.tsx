import { useState, type FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from '../../style/managerDash/managerDash.module.css';
import AddMission from "../user/AddMission";
import AddNewEmployee from "../user/AddNewEmployee";
import { useSelector } from "react-redux";
import ErrorPremission from "../layot/ErrorPremission";

interface ManagerDashProps {

}

const ManagerDash: FunctionComponent<ManagerDashProps> = () => {

    const [displayAddMission, setDisplayAddMission] = useState<boolean>(false);
    const [displayAddNewEmployee, setDisplayAddNewEmployee] = useState<boolean>(false);

    //פרטי המשתמש המחובר - שמור בחנות
    const user = useSelector((state: any) => state.userBaseInfo);
    console.log(JSON.stringify(user) + "  from manager dash");

    const nav = useNavigate();


    //loading the compomemts on hover their links.
    // const PreLoadManageEmployee = ()=> import('./ManageEmployee');
    // const PreLoadManageProjects = ()=> import('./ManageProjects');
    // const PreLoadAddMission = ()=> import('../user/AddMission');

    {/* <div style={{border:"1px solid black", padding:"10px",borderRadius:"30px"}}>
                {onhover or onenter }
                <Link to="/manageEmployee" onMouseOver={PreLoadManageEmployee} >ניהול עובדים</Link>
            </div>

             <div style={{border:"1px solid black", padding:"10px",borderRadius:"30px"}}>
                <Link to="/manageProjects" onMouseOver={PreLoadManageProjects}>ניהול פרויקטים</Link>
            </div>

             <div style={{border:"1px solid black", padding:"10px",borderRadius:"30px"}}>
                <Link to="/addMission" onMouseOver={PreLoadAddMission}>הוספת משימה</Link>
            </div> */}

    if (!user.id || user.managerLevel < 1) {
        return <ErrorPremission />
    }

    return (<>
        <div className="container">

            <div className="btn_back" onClick={() => nav(+1)}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="btn_forword" onClick={() => nav(-1)}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>

            <h1 className="main_title">לוח מנהל</h1>

            <div className={style.managerDash_conatainer}>
                <div id={style.argentTasks}>
                    <h6> Argent tasks</h6>
                    <ul>
                        <li>משימה 1</li>
                        <li>משימת פיתוח </li>
                        <li>משימה 2 </li>
                    </ul>
                </div>

                <div id={style.messageBoard}>
                    <h6> Message Board </h6>
                    <ul>
                        <li>למשימת 1 נשאר 2 ימים </li>
                        <li>יומולדת לדנה</li>
                        <li>רותם ביקשה חופש בתאריך 8.8</li>
                    </ul>
                </div>

                <div id={style.statistics}>
                    <h6>statistics</h6>
                </div>

                <div id={style.quickButtons}>
                    <h6>Quick Buttons</h6>

                    <button onClick={() => setDisplayAddMission(true)} className={style.btnQuick}>add new task</button>
                    {displayAddMission && <AddMission oncloseAddMission={setDisplayAddMission} />}

                    <button onClick={() => setDisplayAddNewEmployee(true)} className={style.btnQuick}>add new Employee</button>
                    {displayAddNewEmployee && <AddNewEmployee oncloseAddNewEmployee={setDisplayAddNewEmployee} />}
                    <div className={style.btnQuick}>
                        <Link to='/tasks/myTasks' className={style.inlineBtnQuick}>my tasks</Link>
                    </div>
                    <div className={style.btnQuick}>
                        <Link to='/tasks/manageEmployessTasks' className={style.inlineBtnQuick}>My employess tasks</Link>
                    </div>
                    <div className={style.btnQuick}>
                        <Link to='/users/manageEmployess' className={style.inlineBtnQuick}>My employess</Link>
                    </div>
                </div>

                <div id={style.managmentSide}>
                    <div>
                        <h6>Manage Employees</h6>
                        <p>5 מנהלים</p>
                        <p>15 עובדים רגילים</p>
                        <p>10 פעילים כרגע</p>
                    </div>
                    <div>
                        <h6>Manage Taks</h6>
                        <p>5 משימות דחופות</p>
                        <p>2 משימות פתוחות</p>
                    </div>
                </div>

                <div id={style.deficiencies}>
                    <h6> lacks </h6>
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
    </>);

}

export default ManagerDash;