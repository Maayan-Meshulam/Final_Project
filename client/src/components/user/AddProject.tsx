import { useState, type FunctionComponent } from "react";
import style from '../../style/addProject/addProject.module.css';

interface AddProjectProps {

}

const AddProject: FunctionComponent<AddProjectProps> = () => {

    const [addSubTask, setAddSubTask] = useState<boolean>(false);
    const [showWorkersList, setWorkersList] = useState<boolean>(false);
    const [choosenWorkers, setChoosenWorkers] = useState<any>([]);
    // const [countTasks, setCountTask] = useState<number>(0)


    const workers: any = [
        { code: 58, fullName: "maayan meshulam" },
        { code: 78, fullName: "rotem meshulam" },
        { code: 98, fullName: "hadar meshulam" },
        { code: 21, fullName: "linor ronen" },
        { code: 70, fullName: "maya shwarz" },
    ];

    const AllTasks: any = [
        {
            title: "", deadline: "", comments: "", file: "", names: [{ code: 70, fullName: "maya shwarz" }],
            subTasks: [{ title: "", deadline: "", comments: "", file: "", names: [{ code: 70, fullName: "maya shwarz" }] }]
        },
        {
            title: "", deadline: "", comments: "", file: "", names: [{ code: 70, fullName: "hadar meshulam" }],
            subTasks: [{ title: "", deadline: "", comments: "", file: "", names: [{ code: 70, fullName: "hadar meshulam" }] }]
        },
    ]

    const [newFilterWorkersArr, setFilterWorkersArr] = useState<any>([...workers])


    //האם השם עובד נמצא במערך העבודים הכולל
    const searchInArrWorkers = (expression: string) => {
        const clearExpression = expression.trim();
        if (clearExpression != "") {
            setFilterWorkersArr(workers.filter((worker: any) => worker.fullName.includes(clearExpression)
                || String(worker.code).includes(clearExpression)));

            return setWorkersList(true)
        }

        setWorkersList(false);
    }

    //רשימה של כל העובדים
    const workersList = () => {
        return (
            <div className={style.workList}>
                {newFilterWorkersArr.map((worker: any) => (
                    <span className={style.workerOption} key={worker.code} onClick={() => {
                        if (chooseWorkerMulti(worker))
                            setChoosenWorkers([...choosenWorkers, { code: worker.code, fullName: worker.fullName }])
                    }}>{`${worker.code} - ${worker.fullName}`}</span>
                ))
                }
            </div >
        )
    }

    //הצגה של כל העובדים שנבחרו
    const showChoosenWorkers = () => {
        return (
            choosenWorkers.map((worker: any) => (
                <div key={worker.code} className={style.containerChoosenWorker}>
                    <span onClick={() => removeTagName(worker)} className={style.removeWorkerSign}>X</span>
                    <span className={style.workerName}>{`${worker.code} - ${worker.fullName}`}</span>
                </div>
            ))
        )
    }

    //הסרת עובד שנבחר
    const removeTagName = (workerToRemove: any) => {
        setChoosenWorkers(choosenWorkers.filter((worker: any) => worker.code != workerToRemove.code));
    }

    //טיפול בבחירת עובד יותר מפעם אחת
    const chooseWorkerMulti = (workerChoosen: any) => {
        for (let worker of choosenWorkers)
            if (worker.code == workerChoosen.code)
                return false;
        return true;
    }


    return (<>
        <div>
            <p onClick={() => {
                addSubTask ? setAddSubTask(false) : setAddSubTask(true);
            }}>הוספת משימה</p>

            {addSubTask && <>

                <form style={{ display: "flex", flexDirection: "column", width: "300px" }}>
                    <input type="text" placeholder="title" />
                    <input type="date" placeholder="deadline" />
                    <input type="file" />
                    <textarea placeholder="comments" />

                    <label htmlFor="">name: </label>
                    <div className={style.containerAllNamesIncludeOptions}>
                        <div className={style.containerChoosenWorkerIncludesInput}>
                            <input type="text" id={style.inputName} onInput={(e: any) => {
                                searchInArrWorkers(e.target.value)
                            }} />
                            {showWorkersList && workersList()}
                        </div>
                        {showChoosenWorkers()}
                    </div>
                    <div>
                        <button>del</button>
                        <button>reset</button>
                        <button type="submit">save</button>
                    </div>

                </form>
                <p onClick={() => addSubTask ? setAddSubTask(false) : setAddSubTask(true)}>+ הוספת משימה</p>

            </>}

        </div>
    </>);
}

export default AddProject;