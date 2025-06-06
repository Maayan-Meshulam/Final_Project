import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ManagerDashProps {
    
}
 
const ManagerDash: FunctionComponent<ManagerDashProps> = () => {

    //loading the compomemts on hover their links.
    const PreLoadManageEmployee = ()=> import('./ManageEmployee');
    const PreLoadManageProjects = ()=> import('./ManageProjects');
    const PreLoadAddMission = ()=> import('../user/AddMission');

    
    return ( <>
        <div>
            <div style={{border:"1px solid black", padding:"10px",borderRadius:"30px"}}>
                {/* onhover or onenter */}
                <Link to="/manageEmployee" onMouseOver={PreLoadManageEmployee} >ניהול עובדים</Link>
            </div>

             <div style={{border:"1px solid black", padding:"10px",borderRadius:"30px"}}>
                <Link to="/manageProjects" onMouseOver={PreLoadManageProjects}>ניהול פרויקטים</Link>
            </div>

             <div style={{border:"1px solid black", padding:"10px",borderRadius:"30px"}}>
                <Link to="/addMission" onMouseOver={PreLoadAddMission}>הוספת משימה</Link>
            </div>
        </div>
    </> );
}
 
export default ManagerDash;