import { useFormik } from "formik";
import React, { useEffect, useState, type FunctionComponent } from "react";
import * as Yup from "yup";

interface FilterBarProps {
    allEmployees: [any],
    setfilters: any
}

const FilterBar: FunctionComponent<FilterBarProps> = ({ allEmployees, setfilters }) => {

    const [isShow, setIsShow] = useState<boolean>(false);
    const [citys, setCitys] = useState<any>([]);
    const [jobs, setJobs] = useState<any>([]);
    const [typeWork, setTypeWork] = useState<any>([]);
    const [fromWhereWork, setFromWhereWork] = useState<any>([]);
    const [department, setDepartment] = useState<any>([]);

    const [initialValuesForm, setInitialValuesForm] = useState<any>({});
    const [validation, setValidation] = useState<any>();
    const [closeBar, setCloseBar] = useState<boolean>(false)

    const createSets = () => {
        const uniqesCitys = new Set();
        const uniqeJobs = new Set();
        const uniqeTypeWork = new Set();
        const uniqeFromWhereWork = new Set();
        const uniqeDepartment = new Set();

        console.log(allEmployees);

        allEmployees.map(employee => {
            uniqesCitys.add(employee.address.city)
            uniqeJobs.add(employee.role)
            uniqeTypeWork.add(employee.jobType)
            uniqeFromWhereWork.add(employee.fromWhereWorking)
            uniqeDepartment.add(employee.department)
        });

        console.log(uniqeJobs, uniqesCitys, uniqeTypeWork,uniqeFromWhereWork,uniqeDepartment, 123);

        setCitys(Array.from(uniqesCitys))
        setJobs(Array.from(uniqeJobs))
        setTypeWork(Array.from(uniqeTypeWork))
        setFromWhereWork(Array.from(uniqeFromWhereWork))
        setDepartment(Array.from(uniqeDepartment))
    }


    useEffect(() => {
        console.log(allEmployees);
        createSets();
    }, [allEmployees]);



    const initialValuesFunc = () => {
        console.log(citys, jobs, typeWork, fromWhereWork, department);

        if (citys.length > 0 && jobs.length > 0 &&
            typeWork.length > 0 && fromWhereWork.length > 0 && department.length > 0) {

            const citysTemp = citys.reduce((acc: any, city: string) => {
                const str = city.replaceAll(" ", "_");
                acc[`city_${str}`] = false;
                return acc;
            }, {});

            const jobsTemp = jobs.reduce((acc: any, role: string) => {
                const str = role.replaceAll(" ", "_");
                acc[`role_${str}`] = false;
                return acc;
            }, {});

            const typeWorkTemp = typeWork.reduce((acc: any, role: string) => {
                const str = role.replaceAll(" ", "_");
                acc[`typeWork_${str}`] = false;
                return acc;
            }, {});

            const fromWhereWorkTemp = fromWhereWork.reduce((acc: any, role: string) => {
                const str = role.replaceAll(" ", "_");
                acc[`fromWhereWork_${str}`] = false;
                return acc;
            }, {});

            const departmentTemp = department.reduce((acc: any, role: string) => {
                const str = role.replaceAll(" ", "_");
                acc[`department_${str}`] = false;
                return acc;
            }, {});

            return {
                ...citysTemp, ...jobsTemp, ...typeWorkTemp,
                ...fromWhereWorkTemp, ...departmentTemp
            }
        }

        return {}
    }

    useEffect(() => {
        console.log(initialValuesForm);
        setInitialValuesForm(initialValuesFunc());
    }, [citys, jobs, typeWork, fromWhereWork, department]);

    useEffect(() => {
        console.log(initialValuesForm);
    }, [initialValuesForm])


    const formik = useFormik({
        initialValues: initialValuesForm,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values);
            setIsShow(false)
            setfilters(values);
        }
    });

    console.log(formik);


    const style: {
        showFilterSide_true: React.CSSProperties,
        showFilterSide_false: React.CSSProperties,
        top_btns_form: React.CSSProperties,
        btnclosePopUp: React.CSSProperties
    } = {
        showFilterSide_true: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "30px",
            position: "fixed",
            top: "150px",
            right: '0',
            backgroundColor: "#f0f0f0c7",
            boxShadow: "1px 5px 7px gray",
            maxHeight:"500px",
            overflowY:"auto",
            textAlign: "right",
            direction: "rtl",
            // transform: "translate(210px)",
            transition: "2s"
        },
        showFilterSide_false: {
            height: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "30px",
            position: "fixed",
            top: "150px",
            right: '0',
            textAlign: "right",
            direction: "rtl",
            transition: "2s",
            // display: "none",
            transform: "translate(210px)"
        },
        top_btns_form: {
            right: "15px",
            top: "15px",
            display: "flex",
            gap: "5px",
            backgroundColor: "none",
            border: "none"
        },
        btnclosePopUp: {
            border: "none",
            backgroundColor: "none"
        }
    }

    return (<>
        <div style={{ direction: "rtl", position: "relative", marginTop: "100px" }}>
            <div style={
                {
                    width: "fit-content", display: "flex",
                    backgroundColor: "#d4e4ecdf", boxShadow: "4px 4px #011f2ddf", justifyContent: "space-around",
                    padding: "5px 15px", borderRadius: "10px", position: "absolute", bottom: "5px"
                }}
                onClick={() => {
                    isShow ? setIsShow(false) : setIsShow(true)
                }}>
                <span>פתח סרגל סינון</span>
            </div>
        </div>



        <form style={style[`showFilterSide_${isShow}`]} onSubmit={formik.handleSubmit}>
            <div style={style.top_btns_form}>
                <button
                    className="close_popUp_btn"
                    // id={style.btnclosePopUp}
                    type="button"
                    onClick={() => {
                        formik.resetForm(),
                            setIsShow(false)
                    }}
                >&#10060;</button>

                <button
                    style={style.reset_btn}
                    type="button"
                    onClick={() => { formik.resetForm({ values: initialValuesForm }) }}
                >&#8635;</button>
            </div>

            <div>
                <h6>עיר</h6>
                {citys && citys.map((city: string) => (
                    <div style={{ display: "flex" }}>
                        <label htmlFor={`city_${city.replaceAll(" ", "_")}`}>{city}</label>
                        <input
                            type="checkbox"
                            id={`city_${city.replaceAll(" ", "_")}`}
                            name={`city_${city.replaceAll(" ", "_")}`}
                            // checked={formik.values[`city_${city}`]}
                            onChange={formik.handleChange}
                        >
                        </input>
                    </div>

                ))}
            </div>

            <div>
                <h6>תפקיד</h6>
                {jobs && jobs.map((role: string) => (
                    <div style={{ display: "flex" }}>
                        <label htmlFor={`role_${role.replaceAll(" ", "_")}`}>{role}</label>
                        <input
                            type="checkbox"
                            id={`role_${role.replaceAll(" ", "_")}`}
                            name={`role_${role.replaceAll(" ", "_")}`}
                            // checked={formik.values[`role_${role}`]}
                            onChange={formik.handleChange}
                        >
                        </input>
                    </div>
                ))}
            </div>

            <div>
                <h6>סוג עבודה</h6>
                {typeWork && typeWork.map((jobType: string) => (
                    <div style={{ display: "flex" }}>
                        <label htmlFor={`typeWork_${jobType.replaceAll(" ", "_")}`}>{jobType}</label>
                        <input
                            type="checkbox"
                            id={`typeWork_${jobType.replaceAll(" ", "_")}`}
                            name={`typeWork_${jobType.replaceAll(" ", "_")}`}
                            // checked={formik.values[`role_${role}`]}
                            onChange={formik.handleChange}
                        >
                        </input>
                    </div>
                ))}
            </div>

            
            <div>
                <h6>מאיפה עובד</h6>
                {fromWhereWork && fromWhereWork.map((fromWhereWorking: string) => (
                    <div style={{ display: "flex" }}>
                        <label htmlFor={`fromWhereWork_${fromWhereWorking.replaceAll(" ", "_")}`}>
                            {fromWhereWorking}</label>
                        <input
                            type="checkbox"
                            id={`fromWhereWork_${fromWhereWorking.replaceAll(" ", "_")}`}
                            name={`fromWhereWork_${fromWhereWorking.replaceAll(" ", "_")}`}
                            // checked={formik.values[`role_${role}`]}
                            onChange={formik.handleChange}
                        >
                        </input>
                    </div>
                ))}
            </div>

            
            <div>
                <h6>סוג עבודה</h6>
                {department && department.map((department: string) => (
                    <div style={{ display: "flex" }}>
                        <label htmlFor={`department_${department.replaceAll(" ", "_")}`}>{department}</label>
                        <input
                            type="checkbox"
                            id={`department_${department.replaceAll(" ", "_")}`}
                            name={`department_${department.replaceAll(" ", "_")}`}
                            // checked={formik.values[`role_${role}`]}
                            onChange={formik.handleChange}
                        >
                        </input>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                style={{ justifySelf: "self-end" }}
            >הצג סינונים</button>
        </form>
    </>);
}

export default FilterBar;