import React, { useEffect, useState, useContext } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { useImmerReducer } from 'use-immer'
import StateContext from '../StateContext'
import Axios from 'axios'
import Step from './Step'
import clsx from 'clsx'
import Select from 'react-select';
import FontAwesome from 'react-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCheck, faPenSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from "react-tooltip"

const useStyles = createUseStyles(theme => ({
    project: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 100,
        "& button": {
            minWidth: "186px",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            fontWeight: "900",
            outline: 0,
            fontSize: 16,
            cursor: "pointer",
            height: 42,
            padding: "0 20px",
            borderRadius: 5,
            boxSizing: "border-box",
        }
    },
    showAddStep: {
        // position: "fixed",
        // bottom: "-5px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        fontWeight: "900",
        fontSize: 16,
        cursor: "pointer",
        height: 42,
        padding: "0 20px",
        borderRadius: 5,
        boxSizing: "border-box",
    },
    openBtn: {
        background: "#6767ff",
        color: "#fff",
        border: "1px solid #f1f1f1"
    },
    closeBtn: {
        background: "#fff",
        color: "#6767ff",
        border: "1px solid #6767ff"
    },
    formHolder: {
        // "@media (max-width: 600px)": {
        //     width: "80%",
        // },
        // "@media (min-width: 601px) and (max-width: 1200px) ": {
        //     width: "60%",
        // },
        // "@media (min-width: 1201px)": {
        //     width: "50%",
        // },
        "& input": {
            background: "#fff",
            padding: "10px",
            // boxShadow: "inset 0 1px 1px rgba(0,0,0,0.03),  inset 0 2px 2px rgba(0,0,0,0.03), inset 0 3px 3px rgba(0,0,0,0.03), inset 0 4px 5px rgba(0,0,0,0.03), inset 0 6px 12px rgba(0,0,0,0.03) ",
            borderRadius: "5px"
        }
    },
    porjectInfo: {
        boxShadow: "0 1px 1px rgba(0,0,0,0.03),  0 2px 2px rgba(0,0,0,0.03), 0 4px 4px rgba(0,0,0,0.03), 0 6px 8px rgba(0,0,0,0.03), 0 8px 16px rgba(0,0,0,0.03) ",
        padding: 40,
        "@media (max-width: 600px)": {
            width: "80%",
        },
        "@media (min-width: 601px) and (max-width: 1200px) ": {
            width: "60%",
        },
        "@media (min-width: 1201px)": {
            width: "50%",
        },
        background: "#fff",
        boxSizing: "border-box",
        marginBottom: "40px"
    },
    projectTitle: {
        background: "#fff",
        border: "none",
        width: "100%",
        outline: 0,
        fontSize: 40,
        lineHeight: "48px",

    },
    projectDescription: {
        border: "none",
        width: "100%",
        outline: 0,
        fontSize: 16,
        lineHeight: "26px",
        marginBottom: 40,
    },
    hide: {
        display: "none"
    },
    stepFormHolder: {
        position: "fixed",
        bottom: 0,
        left: 0,
        transition: ".33s all ease-in-out",
        width: "100%",
        background: "#6767ff",
        alignItems: "center",
        justifyContent: "center",

    },
    stepInfo: {
        display: "flex",
        flex: 1,
        width: "50%",
        margin: "0 auto",
        color: "#fff",
        "& h2": {
            display: "flex",
            justifyContent: "flex-start",
            flex: 1
        },
        "& span": {
            marginTop: "10px",
            cursor: "pointer",
            fontSize: "24px"
        }
    },
    stepForm: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "50%",
        margin: "0 auto",
        "& button": {
            background: "#6767ff",
            color: "#fff",
            marginTop: "20px",
            border: "1px solid #fff",

        },
    },
    stepSegment: {
        display: "flex",
        flexDirection: "row",
        margin: "10px 0",
        "& input": {
            flex: 1,
            display: "flex",
            height: 40,
            boxSizing: "border-box",
            padding: 5,
            margin: "0 10px 0 0 ",
            border: "0",
            borderRadius: 5,
        },
        "& span": {
            flex: 1,
            display: "flex",
        },
        "& label": {
            margin: "0 10px 0 0 ",
            color: "#fff",
            lineHeight: "40px",
            justifyContent: "flex-end"
        },
        "& select": {
            padding: "0 10px",
            height: 40,
            borderRadius: 5,
            border: "0"
        },
    },
    steps: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        paddingBottom: "30px",
        "@media (max-width: 600px)": {
            width: "80%",
        },
        "@media (min-width: 601px) and (max-width: 1200px) ": {
            width: "60%",
        },
        "@media (min-width: 1201px)": {
            width: "50%",
        },
    },
    step: {
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "row",
        "& span": {
            fontSize: "20px"
        }
    },
    stepBody: {
        display: "flex",
        flexDirection: "column",
        flex: 8
    },
    stepDuration: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 2
    },
    stepSpan: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1
    },
    editSpan: {
        color: "#6767ff",
        cursor: "pointer"
    },
    incomplete: {
        color: "#fff",
        opacity: 0
    },
    stepCompleted: {
        "& span": {
            color: "#6767ff",
            display: "flex",
            flex: 1,
            fontSize: "24px",
            justifyContent: "flex-end",
            alignItems: "center"
        }
    },
    stepFormHolder: {
        position: "fixed",
        bottom: 0,
        left: 0,
        transition: ".33s all ease-in-out",
        width: "100%",
        background: "#6767ff",
        alignItems: "center",
        justifyContent: "center",

    },
    stepInfo: {
        display: "flex",
        flex: 1,
        width: "50%",
        margin: "0 auto",
        color: "#fff",
        "& h2": {
            display: "flex",
            justifyContent: "flex-start",
            flex: 1
        },
        "& span": {
            marginTop: "10px",
            cursor: "pointer",
            fontSize: "24px"
        }
    },
    stepForm: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "50%",
        margin: "0 auto",
        "& button": {
            background: "#6767ff",
            color: "#fff",
            marginTop: "20px",
            border: "1px solid #fff",

        },
    },
    stepSegment: {
        display: "flex",
        flexDirection: "row",
        margin: "10px 0",
        "& input": {
            flex: 1,
            display: "flex",
            height: 40,
            boxSizing: "border-box",
            padding: 5,
            margin: "0 10px 0 0 ",
            border: "0",
            borderRadius: 5,
        },
        "& span": {
            flex: 1,
            display: "flex",
        },
        "& label": {
            margin: "0 10px 0 0 ",
            color: "#fff",
            lineHeight: "40px",
            justifyContent: "flex-end"
        },
        "& select": {
            padding: "0 10px",
            height: 40,
            borderRadius: 5,
            border: "0"
        },
    },

}))

const options = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
];

function ProjectView(props) {
    const { id } = useParams()
    const appState = useContext(StateContext)


    const initialState = {
        project: {
            title: "",
            description: "",
            steps: [],
            isLoaded: false
        },
        newStep: {
            name: "",
            duration: 0,
            isCompleted: false
        },
        isStepOpen: false,
        editCount: 0,
        editTitleCount: 0,
        token: appState.user.token,
        id: useParams().id,
        isStepEditing: false,
        step: {
            id: "",
            name: "",
            duration: 0,
            isCompleted: false
        },
        stepUpdate: 0
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "setProject":
                draft.project.title = action.value.title
                draft.project.description = action.value.description
                draft.project.steps = action.value.steps
                draft.project.isLoaded = true
                return
            case "editTitle":
                draft.project.title = action.value
                return

            case "toggleStep":
                draft.isStepOpen = !draft.isStepOpen
                return

            case "closeStep":
                draft.isStepOpen = false
                return

            case "addStep":
                draft.project.steps.shift(action.value)
                draft.project.steps.push(action.value)
                return

            case "addSteps":
                draft.project.steps.push(action.data)
                return

            case "setSteps":
                draft.project.steps = action.data
                return

            case "clearNewStep":
                draft.newStep.name = ""
                draft.newStep.duration = null
                draft.newStep.isCompleted = false
                return

            case "toggleCompleted":
                draft.newStep.isCompleted = action.value
                return


            case "stepName":
                draft.newStep.name = action.value
                return

            case "stepDuration":
                draft.newStep.duration = action.value
                return

            case "editDescription":
                draft.project.description = action.value
                return
            case "isLoaded":
                draft.project.isLoaded = action.value
                return

            case "editCount":
                draft.editCount++

            case "toggleEdit":
                draft.isStepEditing = !draft.isStepEditing
                return

            case "toggleStepUpdate":
                draft.stepUpdate++
                return

            case "updateStep":
                draft.step.name = action.data.name
                draft.step.duration = action.data.duration
                draft.step.isCompleted = action.data.isCompleted

                draft.project.steps.push(action.data)
                return

            case "editStepName":
                draft.step.name = action.value
                return

            case "editStepDuration":
                draft.step.duration = action.value
                return

            case "setStep":
                draft.step.name = action.value.name
                draft.step.id = action.value._id
                draft.step.duration = action.value.duration
                draft.step.isCompleted = action.value.isCompleted
                draft.isStepEditing = true
                return

            case "setStep":
                draft.step.name = ""
                draft.step.id = ""
                draft.step.duration = 0
                draft.step.isCompleted = false
                draft.isStepEditing = false
                return

            case "removeStep":
                draft.project.steps.shift(action.value)
                return

            case "closeStepEdit":
                draft.isStepEditing = false
                return


        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        console.log(id)
        if (id) {
            async function fetchProject() {
                try {
                    const response = await Axios.get(`http://localhost:5000/projects/${state.id}`, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
                    if (response.data) {
                        console.log(response.data)
                        dispatch({ type: "isLoaded", value: true })
                        dispatch({ type: "setProject", value: response.data })
                    } else {
                        console.log("There was an error getting a response from the server.")
                    }

                } catch (e) {
                    console.log("There was an error.")
                }
            }
            fetchProject()
            return () => {
                ourRequest.cancel()
            }
        } else {
            console.log('Something went wrong.')
        }
    }, [id])

    // function toggleStepEdit(e) {
    //     e.preventDefault()
    //     const response = await Axios.get(`http://localhost:5000/projects/${id}/edit/${props.step._id}`, { name: state.step.name, duration: state.step.duration, isCompleted: state.step.isCompleted, id: props.step_id }, { headers: { "freedashToken": appState.user.token } })
    //     dispatch({ type: "toggleEdit" })
    // }

    useEffect(() => {
        async function updateProject() {
            try {
                const project = await Axios.get(`http://localhost:5000/projects/${id}/steps`, { headers: { "freedashToken": appState.user.token } })
                console.log(project.data)
                if (project.data) {

                    // dispatch({ type: "setProject", value: project.data })
                    dispatch({ type: "setSteps", data: project.data })
                    dispatch({ type: "isLoaded", value: true })

                } else {
                    console.log("There was an error getting a response from the server.")
                }
            } catch {
                console.log("There was an error.")
            }
        }
        updateProject()
    }, [state.stepUpdate])

    async function handleStepEdit(e) {
        e.preventDefault()
        try {
            const response = await Axios.post(`http://localhost:5000/projects/${id}/edit/${state.step.id}`, { name: state.step.name, duration: state.step.duration, isCompleted: state.step.isCompleted, id: state.step.id, projectId: id }, { headers: { "freedashToken": appState.user.token } })
            console.log(response.data)
            dispatch({ type: "clearStateStep" })


            // const project = await Axios.post(`http://localhost:5000/projects/${state.id}/edit`, { title: state.project.title, description: state.project.description, steps: state.project.steps, userId: appState.user.id }, { headers: { "freedashToken": appState.user.token } })

            dispatch({ type: "toggleEdit" })
            dispatch({ type: "toggleStepUpdate" })
            // const edit = await Axios.post(`http://localhost:5000/projects/${id}/edit`, { title: state.project.title, description: state.project.description, steps: state.project.steps, userId: appState.user.id }, { headers: { "freedashToken": appState.user.token } })
            // console.log(edit.data)
            // const projectSteps = await Axios.get(`http://localhost:5000/projects/${id}/steps`, { headers: { "freedashToken": appState.user.token } }, { projectId: id })
            // // dispatch({ type: "removeStep", value: response.data })



        } catch {
            console.log("There was an error.")
        }
    }

    // useEffect(() => {
    //     const ourRequest = Axios.CancelToken.source()
    //     console.log(id)
    //     const token = appState.user.token
    //     console.log(state.token)
    //     console.log(state.project.steps)
    //     if (id) {
    //         async function fetchSteps() {
    //             try {
    //                 const steps = await Axios.get(`http://localhost:5000/projects/${id}/steps`, { projectId: id }, { headers: { "freedashToken": token } }, { cancelToken: ourRequest.token })
    //                 if (steps.data) {
    //                     console.log(steps.data)
    //                     dispatch({ type: "addSteps", data: steps.data })
    //                 } else {
    //                     console.log("There was an error getting a response from the server.")
    //                 }
    //             } catch (e) {
    //                 console.log("There was an error." + e)
    //             }
    //         }
    //         fetchSteps()
    //         return () => {
    //             ourRequest.cancel()
    //         }
    //     } else {
    //         console.log('Something went wrong.')
    //     }
    // }, [])


    // useEffect(() => {
    //     dispatch({ type: "clearNewStep" })
    // }, [state.project.steps])


    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        if (id) {
            async function fetchProject() {
                try {
                    const edit = await Axios.post(`http://localhost:5000/projects/${state.id}/edit`, { title: state.project.title, description: state.project.description, userId: appState.user.id, steps: state.project.steps }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
                    console.log(edit.data)
                } catch (e) {
                    console.log("There was an error.")
                }
            }
            fetchProject()
            return () => {
                ourRequest.cancel()
            }
        } else {
            console.log('Something went wrong.')
        }
    }, [state.project.title])


    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        if (id) {
            async function fetchProject() {
                try {
                    const edit = await Axios.post(`http://localhost:5000/projects/${state.id}/edit`, { title: state.project.title, description: state.project.description, steps: state.project.steps }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
                    console.log(edit.data)
                } catch (e) {
                    console.log("There was an error.")
                }
            }
            fetchProject()
            return () => {
                ourRequest.cancel()
            }
        } else {
            console.log('Something went wrong.')
        }
    }, [state.project.description])

    async function handleAddStep(e) {
        e.preventDefault()
        const ourRequest = Axios.CancelToken.source()
        try {
            const response = await Axios.post(`http://localhost:5000/projects/${state.id}/steps/create`, { name: state.newStep.name, duration: state.newStep.duration, projectId: id, userId: appState.user.id, isCompleted: state.newStep.isCompleted }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
            if (response.data) {
                console.log(response.data)
                dispatch({ type: "setProject", value: response.data })
                dispatch({ type: "isLoaded", value: true })
                dispatch({ type: "clearNewStep" })
                dispatch({ type: "closeStep" })
            } else {
                console.log("There was an error getting a response from the server.")
            }
        } catch (e) {
            console.log("There was an error:" + e)
        }
        return () => {
            ourRequest.cancel()
        }
    }

    function toggleAddStep(e) {
        e.preventDefault()
        dispatch({ type: "closeStepEdit" })
        dispatch({ type: "stepDuration", value: "" })
        console.log(state.newStep.duration)
        dispatch({ type: "toggleStep" })
    }

    const classes = useStyles()
    const project = state.project

    if (state.project.isLoaded) {
        return (
            <div className={classes.project}>
                <div className={classes.porjectInfo}>
                    <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                        <form>
                            <input className={classes.projectTitle} type="text" onChange={e => dispatch({ type: "editTitle", value: e.target.value })} value={project.title} placeholder={project.title !== "" ? "" : "Give your project a title"} />
                        </form>
                    </div>
                    <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                        <form>
                            <input className={classes.projectDescription} onChange={e => dispatch({ type: "editDescription", value: e.target.value })} value={project.description} placeholder={project.description !== "" ? "" : "Build something awesome."} />
                        </form>
                    </div>

                    {!state.isStepOpen ? <button onClick={toggleAddStep} className={clsx(classes.openBtn, classes.showAddStep)}>Add Step</button> : <button onClick={toggleAddStep} className={clsx(classes.closeBtn, classes.showAddStep)}>Close</button>}
                </div>

                {!state.isStepOpen ? <></> : (
                    // MAKE THIS A TRANSITION GROUP
                    <div className={state.isStepOpen ? classes.stepFormHolder : classes.hide}>
                        <div className={classes.stepInfo}>
                            <h2>Add Step</h2>
                            <span onClick={toggleAddStep}>&times;</span>
                        </div>
                        <form onSubmit={handleAddStep} className={classes.stepForm}>
                            <div className={classes.stepSegment}>
                                <input className={classes.stepName} name="newStepName" value={state.newStep.name} placeholder={state.newStep.name !== "" ? "" : "What's next?"} onChange={e => dispatch({ type: "stepName", value: e.target.value })} />
                                <input type="number" value={state.newStep.duration} placeholder={state.newStep.duration ? "" : "Duration (In minutes)"} className={classes.stepDuration} onChange={e => dispatch({ type: "stepDuration", value: e.target.value })} />
                            </div>
                            <br />
                            <div className={classes.stepSegment}>
                                <label>Has this step been completed?</label>
                                <select onChange={e => dispatch({ type: "toggleCompleted", value: e.target.value })}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <button type="submit" >Create</button>
                        </form>

                    </div>
                )}



                <div className={classes.steps}>
                    {state.project.steps.map(step => {
                        return (
                            // <Step step={step} />
                            <div>
                                <div className={step.isCompleted ? clsx(classes.step, classes.stepCompleted) : classes.step}>
                                    <div className={classes.stepBody}>
                                        <h3>{step.name}</h3>

                                    </div>
                                    <div className={classes.stepDuration}>
                                        <p>{step.duration} minutes</p>
                                    </div>
                                    <div className={classes.stepSpan}>
                                        <ReactTooltip place="bottom" id="completed" className="custom-tooltip" />{" "}
                                        {step.isCompleted ? <span data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span> : <span className={classes.incomplete} data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span>}
                                    </div>
                                    <div className={classes.stepSpan}>
                                        <span onClick={e => { dispatch({ type: "setStep", value: step }) }} className={classes.editSpan} data-tip="Completed"><FontAwesomeIcon icon={faEdit} /></span>
                                    </div>
                                </div>
                                {state.isStepEditing && (

                                    <div className={classes.stepFormHolder}>
                                        <div className={classes.stepInfo}>
                                            <h2>Edit Step</h2>
                                            <span onClick={() => { dispatch({ type: "toggleEdit" }) }}>&times;</span>
                                        </div>
                                        <form onSubmit={handleStepEdit} className={classes.stepForm}>
                                            <div className={classes.stepSegment}>
                                                <input className={classes.stepName} value={state.step.name} placeholder={state.step.name !== "" ? "" : "What's next?"} onChange={e => dispatch({ type: "editStepName", value: e.target.value })} />
                                                <input type="number" value={state.step.duration} placeholder={state.step.duration ? "" : "Duration (In minutes)"} className={classes.stepDuration} onChange={e => dispatch({ type: "editStepDuration", value: e.target.value })} />
                                            </div>
                                            <br />
                                            <div className={classes.stepSegment}>
                                                <label>Has this step been completed?</label>
                                                <select onChange={e => dispatch({ type: "toggleCompleted", value: e.target.value })}>
                                                    <option value={false} selected={state.step.isCompleted == false}>No</option>
                                                    <option value={true} selected={state.step.isCompleted == true}>Yes</option>
                                                </select>
                                            </div>
                                            <button type="submit" >Update</button>
                                        </form>

                                    </div>

                                )}
                            </div>
                        )
                    }).reverse()}
                </div>
            </div>
        )
    } else {
        return (

            <div className={classes.project}>
                <div className={classes.porjectInfo}>
                    <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                        <form>
                            <input className={classes.projectTitle} type="text" placeholder={project.title !== "" ? "" : ""} />
                        </form>
                    </div>
                    <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                        <form>
                            <input className={classes.projectDescription} placeholder={project.description !== "" ? "" : ""} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }



}

export default ProjectView