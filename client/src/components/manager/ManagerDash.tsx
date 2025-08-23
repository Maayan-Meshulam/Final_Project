import { useState, type FunctionComponent } from "react";
import { Link } from "react-router-dom";
import style from '../../style/managerDash/managerDash.module.css';
import AddMission from "../user/AddMission";
import AddNewEmployee from "./AddNewEmployee";

interface ManagerDashProps {

}

const ManagerDash: FunctionComponent<ManagerDashProps> = () => {

    const [displayAddMission, setDisplayAddMission] = useState<boolean>(false);
    const [displayAddNewEmployee, setDisplayAddNewEmployee] = useState<boolean>(false);


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

    return (<>
        <div className="container_page">
            <div className={style.managerDash_conatainer}>
                <div id={style.argentTasks}>
                    <h6> Argent tasks</h6>
                    <ul>
                        <li>משימה עיצוב</li>
                        <li>משימה פיתוח ומחקר</li>
                        <li>משימה פיתוח ועיצוב</li>
                    </ul>
                </div>

                <div id={style.messageBoard}>
                    <h6> Message Board </h6>
                    <ul>
                        <li>למשימת עיצוב נשארו עוד 7 ימים </li>
                        <li>יומולדת לדנה</li>
                        <li>רותם ביקשה חופש בתאריך 8.8</li>
                    </ul>
                </div>

                <div id={style.statistics}>
                    <h6>statistics</h6>
                </div>

                <div id={style.quickButtons}>
                    <h6>Quick Buttons</h6>

                    <button onClick={() => setDisplayAddMission(true)} >add new task</button>
                    {displayAddMission && <AddMission oncloseAddMission={setDisplayAddMission} />}

                    <button onClick={() => setDisplayAddNewEmployee(true)} >add new Employee</button>
                    {displayAddNewEmployee && <AddNewEmployee oncloseAddNewEmployee={setDisplayAddNewEmployee} />}

                    <Link to='/AddProject'>add new project</Link>
                    <button>chat</button>
                </div>

                <div id={style.managmentSide}>
                    <div>
                        <h6>Manage Employees</h6>
                        <p>5 מנהלים</p>
                        <p>15 עובדים רגילים</p>
                        <p>10 פעילים כרגע</p>
                    </div>
                    <div>
                        <h6>Manage Projects & Taks</h6>
                        <p>6 פרויקטים פתוחים</p>
                        <p>2 משימות פתוחות</p>
                    </div>
                </div>

                <div id={style.deficiencies}>
                    <h6> lacks </h6>
                    <ul>
                        <li>למשימת עיצוב חסר מעצב גרפי </li>
                        <li> למשימת פיתוח חסר מפתח צד שרת</li>
                    </ul>
                </div>
            </div>
        </div>
    </>);
}

export default ManagerDash;