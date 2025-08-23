import type { FunctionComponent } from "react";
import style from '../../style/singleProject/singleProject.module.css';

interface SingleProjectProps {

}

const SingleProject: FunctionComponent<SingleProjectProps> = () => {
    return (<>
        <div className="container_page" style={{alignItems:"normal"}}>

            <div className={style.container_general_characterization_project}>
                <h1>Project Name </h1>

                <div id={style.containerStatusProject}>
                    <span id={style.precentPerform}>30%</span>
                    <span>-</span>
                    <span id={style.status}>in process</span>
                </div>

                <div className={style.General_details}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Blanditiis facere iste laboriosam sit necessitatibus natus mollitia ea et,
                    incidunt consequuntur suscipit similique nesciunt porro odio cumque minima repudiandae saepe earum?
                </div>

                <div>
                    <span style={{ fontWeight: "bold", maxWidth: "1400px"}}>members team: </span>
                    <span>maayan | </span>
                    <span>rotem | </span>
                    <span>hadar | </span>
                    <span>maya | </span>
                    <span>linor</span>
                </div>

                <p>קבצים מצורפים</p>

            </div>

            <div>
                <table className={style.Work_distribution_table}>
                    <caption style={{captionSide:"top"}}>Work Distribution</caption>
                    <thead>
                        <tr>
                            {/* לא עובד האורך המקסמילי */}
                            <th style={{width:"70px", padding:"0"}}>מסד</th>
                            <th>שם משימה</th>
                            <th>אחראי</th>
                            <th>סטטוס</th>
                            <th>ת.ג.ב</th>
                            <th>קבצים </th>
                            <th>הערות</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>משימה ראשונה</td>
                            <td>מעיין</td>
                            <td>בתהליך</td>
                            <td>20/06/25</td>
                            <td>אין קבצים</td>
                            <td>אין הערות</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>משימה שנייה</td>
                            <td>רותם</td>
                            <td>בתהליך</td>
                            <td>08/06/25</td>
                            <td>אין קבצים</td>
                            <td>אין הערות</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>משימה שלישית</td>
                            <td>הדר</td>
                            <td>בוצע</td>
                            <td>05/05/25</td>
                            <td>אין קבצים</td>
                            <td>אין הערות</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>משימה רביעית</td>
                            <td>לינור</td>
                            <td>בתהליך</td>
                            <td>20/05/25</td>
                            <td>אין קבצים</td>
                            <td>אין הערות</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>משימה חמישית</td>
                            <td>מאיה</td>
                            <td>בוצע</td>
                            <td>04/04/25</td>
                            <td>אין קבצים</td>
                            <td>אין הערות</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </>);
}

export default SingleProject;