import type { FunctionComponent } from "react";
import style from '../../style/singleMission/singleMission.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask } from "../../services/tasksService";

interface SingleMissionProps {

}

const SingleMission: FunctionComponent<SingleMissionProps> = () => {

    const nav = useNavigate();
    const {id} = useParams();

    return (<>
        <div className="container_page">
            <div className={style.mission_container}>
                <div className={style.task_characterization}>
                    <h1>Mission Name</h1>
                    <p>in process</p>
                    <p><span>catagory: </span>part of project</p>
                    <div style={{ textAlign: "justify" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, delectus omnis.
                        Aliquid, aperiam sint facere aliquam odit neque sit debitis aut ex porro autem delectus asperiores,
                        optio quidem, quae eaque?
                    </div>
                    <p><span>responibility: </span>maayan meshulam</p>
                    <div>
                        <p><span>start date: </span>15/06/2025</p>
                        <p><span>end date: </span>08/08/2025</p>
                    </div>
                    <div className={style.buttons_container}>
                        <button
                            type="button"
                            onClick={() => nav('/updateTask')}
                        >Edit</button>

                        <button
                            type="button"
                            onClick={()=>{
                                deleteTask(id)
                                .then(res=>{
                                    console.log(res.data);                                    
                                })
                                .catch(error=>{
                                    console.log(error);
                                })
                            }}
                        >Delete</button>
                        
                    </div>
                </div>

                <div className={style.Marginal_information_task}>
                    <p>Attachments</p>
                    <div className={style.comments_container}>
                        <h6>comments</h6>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, modi!</li>
                            <li>Omnis, quae? Voluptate maiores quisquam eaque quidem distinctio repudiandae deleniti officiis repellendus.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SingleMission;