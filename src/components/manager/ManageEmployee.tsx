import type { FunctionComponent } from "react";
import style from '../../style/manageEmployee/manageEmployee.module.css';

interface ManageEmployeeProps {

}

const ManageEmployee: FunctionComponent<ManageEmployeeProps> = () => {
    return (<>

        <table className={style.employessTable}>
            <caption>employees</caption>
            <thead>
                <tr>
                    <th>מזהה</th>
                    <th>שם פרטי</th>
                    <th>שם פרטי</th>
                    <th>שם משפחה</th>
                    <th>עיר</th>
                    <th>רחוב</th>
                    <th>מספר בית</th>
                    <th>האם מנהל</th>
                    <th>צוות</th>
                    <th>תפקיד</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>מזהה</td>
                    <td>שם פרטי</td>
                    <td>שם פרטי</td>
                    <td>שם משפחה</td>
                    <td>עיר</td>
                    <td>רחוב</td>
                    <td>מספר בית</td>
                    <td>האם מנהל</td>
                    <td>צוות</td>
                    <td>תפקיד</td>
                </tr>
                <tr>
                    <td>מזהה</td>
                    <td>שם פרטי</td>
                    <td>שם פרטי</td>
                    <td>שם משפחה</td>
                    <td>עיר</td>
                    <td>רחוב</td>
                    <td>מספר בית</td>
                    <td>האם מנהל</td>
                    <td>צוות</td>
                    <td>תפקיד</td>
                </tr>
                <tr>
                    <td>מזהה</td>
                    <td>שם פרטי</td>
                    <td>שם פרטי</td>
                    <td>שם משפחה</td>
                    <td>עיר</td>
                    <td>רחוב</td>
                    <td>מספר בית</td>
                    <td>האם מנהל</td>
                    <td>צוות</td>
                    <td>תפקיד</td>
                </tr>
                <tr>
                    <td>מזהה</td>
                    <td>שם פרטי</td>
                    <td>שם פרטי</td>
                    <td>שם משפחה</td>
                    <td>עיר</td>
                    <td>רחוב</td>
                    <td>מספר בית</td>
                    <td>האם מנהל</td>
                    <td>צוות</td>
                    <td>תפקיד</td>
                </tr>
            </tbody>
        </table>
    </>);
}

export default ManageEmployee;