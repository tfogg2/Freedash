import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { useImmerReducer } from 'use-immer'
import StateContext from '../StateContext'
import Axios from 'axios'
import Step from './Step'
import clsx from 'clsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCheck, faPenSquare, faEdit } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import ReactTooltip from "react-tooltip"
import DispatchContext from '../DispatchContext'
import PageNotFound from './PageNotFound'

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
            borderRadius: "5px"
        },
        "& textarea": {
            background: "#fff",
            padding: "10px",
            borderRadius: "5px"
        },

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
    deleteProject: {
        float: "right",
        color: "#ff2828",
        cursor: "pointer"
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
        resize: "none",
        fontSize: 16,
        height: "100%",
        lineHeight: "26px",
    },
    progressBarContianer: {
        margin: "40px auto 60px auto",
        padding: "0 5px"
    },
    fullBar: {
        display: "flex",
        height: 20,
        borderRadius: 25,
        border: ".5px solid #f3f3f3"
    },
    progressBar: {
        transition: "width .3s ease-in-out",
        height: 20,
        background: "#6767ff",
        borderRadius: 25
    },
    hide: {
        display: "none"
    },
    stepFormHolder: {
        position: "fixed",
        zIndex: 2000,
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
        height: "100px",
        margin: "0 auto",
        color: "#fff",
        flexDirection: "column",
        "& h2": {
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 10
        },
        "& span": {
            marginTop: "10px",
            position: "absolute",
            right: "25%",
            cursor: "pointer",
            fontSize: "24px",
            float: "right"
        }
    },
    deleteStep: {
        display: "flex",
        color: "#ffffff73",
        cursor: "pointer",
        margin: 0,
    },
    stepForm: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "50%",
        paddingBottom: 20,
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
        minHeight: "300px",
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
        cursor: "pointer",
        flexDirection: "row",
        "& span": {
            fontSize: "20px"
        }
    },
    stepBody: {
        display: "flex",
        flexDirection: "column",
        flex: 8,
        "& h3": {
            display: "inline-block",
            lineHeight: "24px"
        }
    },
    stepDuration: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 2
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
        opacity: ".3",
        "& span": {
            color: "#6767ff"
        }
    },
}))

const options = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
];

function ProjectView(props) {
    const { id } = useParams()
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const initialState = {
        project: {
            title: "",
            description: "",
            steps: [],
            userId: "",
            isLoaded: false
        },
        newStep: {
            name: "",
            duration: 0,
            isCompleted: false
        },
        isStepOpen: false,
        editCount: 0,
        progress: 0,
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
        stepUpdate: 0,
        countCompleted: 0
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "setProject":
                draft.project.title = action.value.title
                draft.project.description = action.value.description
                draft.project.steps = action.value.steps
                draft.project.userId = action.value.userId
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

            case "setProgress":
                draft.progress = action.value
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

            case "editStepStatus":
                draft.step.isCompleted = action.value
                return

            case "setStep":
                draft.step.name = action.value.name
                draft.step.id = action.value._id
                draft.step.duration = action.value.duration
                draft.step.isCompleted = action.value.isCompleted
                draft.isStepEditing = true
                return

            case "emptyStep":
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

            case "countCompleted":
                draft.countCompleted = action.value
                return



        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        if (id) {
            const ourRequest = Axios.CancelToken.source()
            async function fetchProject() {
                try {
                    const response = await Axios.get(`http://localhost:5000/projects/${state.id}`, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
                    if (response.data) {
                        // console.log(response.data)
                        dispatch({ type: "isLoaded", value: true })
                        dispatch({ type: "setProject", value: response.data })
                        dispatch({ type: "toggleStepUpdate" })
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
    }, [id, state.id])

    useEffect(() => {
        async function updateProject() {
            try {
                const project = await Axios.get(`http://localhost:5000/projects/${id}/steps`, { headers: { "freedashToken": appState.user.token } })
                // console.log(project.data)
                if (project.data) {
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
    }, [state.stepUpdate, appState.user])

    async function handleStepEdit(e) {
        e.preventDefault()
        try {
            const response = await Axios.post(`http://localhost:5000/projects/${id}/edit/${state.step.id}`, { name: state.step.name, duration: state.step.duration, isCompleted: state.step.isCompleted, id: state.step.id, projectId: id }, { headers: { "freedashToken": appState.user.token } })
            // console.log(response.data)
            dispatch({ type: "clearStateStep" })
            dispatch({ type: "toggleEdit" })
            dispatch({ type: "toggleStepUpdate" })
            appDispatch({ type: "flashMessage", value: "Step updated successfully!" })

        } catch {
            console.log("There was an error.")
        }
    }

    useEffect(() => {
        async function progressBar() {
            try {
                const totalDuration = await Axios.get(`http://localhost:5000/projects/${id}/steps/progress`, { headers: { "freedashToken": appState.user.token } })
                const completedDuration = await Axios.get(`http://localhost:5000/projects/${id}/steps/completed`, { headers: { "freedashToken": appState.user.token } })
                dispatch({ type: "countCompleted", value: completedDuration.data })
                const progress = ((completedDuration.data / totalDuration.data) * 100)
                const width = "width: " + progress + "%"
                console.log(width)
                dispatch({ type: "setProgress", value: progress })
            } catch {
                console.log("There was an error.")
            }
        }
        progressBar()
    }, [state.project, appState.user])

    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        if (id) {
            async function fetchProject() {
                try {
                    const edit = await Axios.post(`http://localhost:5000/projects/${state.id}/edit`, { title: state.project.title, description: state.project.description, userId: appState.user.id, steps: state.project.steps }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
                    // console.log(edit.data)
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
    }, [state.project.title, appState.user])


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
    }, [state.project.description, appState.user])



    async function handleStepDelete(e) {
        e.preventDefault()
        try {
            var result = window.confirm("Are you sure?")
            if (result == true) {
                const deleteStep = await Axios.delete(`http://localhost:5000/projects/${id}/steps/${state.step.id}`, { headers: { "freedashToken": appState.user.token } })
                dispatch({ type: "emptyStep" })
                dispatch({ type: "toggleStepUpdate" })
                console.log(deleteStep.data)
            }
        } catch {
            console.log("There was an error.")
        }
    }

    async function handleProjectDelete(e) {
        e.preventDefault()
        try {
            var result = window.confirm("Are you sure you want to delete this project?")
            if (result == true) {
                const deleteProject = await Axios.delete(`http://localhost:5000/projects/${id}/`, { headers: { "freedashToken": appState.user.token } })
                props.history.push("/")
                console.log(deleteProject.data)
            }
        } catch {
            console.log("There was an error.")
        }
    }

    async function handleAddStep(e) {
        e.preventDefault()
        const ourRequest = Axios.CancelToken.source()
        try {
            const response = await Axios.post(`http://localhost:5000/projects/${state.id}/steps/create`, { name: state.newStep.name, duration: state.newStep.duration, projectId: id, userId: state.project.userId, isCompleted: state.newStep.isCompleted }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
            if (response.data) {
                // console.log(response.data)
                dispatch({ type: "setProject", value: response.data })
                dispatch({ type: "isLoaded", value: true })
                dispatch({ type: "clearNewStep" })
                dispatch({ type: "closeStep" })
                appDispatch({ type: "flashMessage", value: "Step added successfully!" })
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

    async function toggleShare(e) {
        e.preventDefault()
        const response = await Axios.post(`http://localhost:5000/projects/${state.id}/share`, { headers: { "freedashToken": appState.user.token } })
        console.log(response.data)
    }


    function toggleAddStep(e) {
        e.preventDefault()
        dispatch({ type: "closeStepEdit" })
        dispatch({ type: "stepDuration", value: "" })
        dispatch({ type: "toggleStep" })
    }

    const classes = useStyles()
    const project = state.project
    const percentage = state.progress + "%"

    // if (appState.user.id == project.userId) {
    if (state.project.isLoaded) {
        return (
            <div className={classes.project}>
                <div className={classes.porjectInfo}>
                    <span className={classes.deleteProject} onClick={handleProjectDelete}>&times;</span>
                    <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                        <form>
                            <input className={classes.projectTitle} type="text" onChange={e => dispatch({ type: "editTitle", value: e.target.value })} value={project.title} placeholder={project.title !== "" ? "" : "Give your project a title"} />
                        </form>
                    </div>
                    <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                        <form>
                            <TextareaAutosize className={classes.projectDescription} onChange={e => dispatch({ type: "editDescription", value: e.target.value })} value={project.description} placeholder={project.description !== "" ? "" : "Build something awesome."} />
                        </form>
                    </div>
                    <div className={classes.progressBarContianer}>
                        <span className={classes.fullBar}>
                            <span className={classes.progressBar} style={{ width: percentage }}></span>
                        </span>
                    </div>
                    {/* <button onClick={toggleShare}>Share</button> */}
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
                                <ReactTooltip place="bottom" id="completed" className="custom-tooltip" />
                                <div onClick={e => { dispatch({ type: "setStep", value: step }) }} className={step.isCompleted ? clsx(classes.step, classes.stepCompleted) : classes.step}>
                                    <div className={classes.stepBody}>
                                        <h3>
                                            {step.name}
                                        </h3>
                                        {/* <div className={classes.stepSpan}>   
                                                {step.isCompleted ? (
                                                    <>
                                                        <ReactTooltip place="bottom" id="completed" className="custom-tooltip" />
                                                        <span data-tip="Completed"><FontAwesomeIcon icon={faCheckSquare} /></span>
                                                    </>
                                                ) : <span className={classes.incomplete} data-tip="Completed"></span>}
                                            </div> */}

                                    </div>

                                    <div className={classes.stepDuration}>
                                        <p>{step.duration ? step.duration + " minutes" : <></>}</p>
                                    </div>

                                    {/* <div className={classes.stepSpan}>
                                            <span onClick={e => { dispatch({ type: "setStep", value: step }) }} className={classes.editSpan} data-tip="Completed"><FontAwesomeIcon icon={faEdit} /></span>
                                        </div> */}
                                </div>
                                {state.isStepEditing && (
                                    <div className={classes.stepFormHolder}>
                                        <div className={classes.stepInfo}>
                                            <span onClick={() => { dispatch({ type: "toggleEdit" }) }}>&times;</span>
                                            <h2>Edit Step</h2>
                                            <p className={classes.deleteStep} onClick={handleStepDelete}>Delete</p>
                                        </div>
                                        <form onSubmit={handleStepEdit} className={classes.stepForm}>
                                            <div className={classes.stepSegment}>
                                                <input className={classes.stepName} value={state.step.name} placeholder={state.step.name !== "" ? "" : "What's next?"} onChange={e => dispatch({ type: "editStepName", value: e.target.value })} />
                                                <input type="number" value={state.step.duration} placeholder={state.step.duration ? "" : "Duration (In minutes)"} className={classes.stepDuration} onChange={e => dispatch({ type: "editStepDuration", value: e.target.value })} />
                                            </div>
                                            <br />
                                            <div className={classes.stepSegment}>
                                                <label>Has this step been completed?</label>
                                                <select onChange={e => dispatch({ type: "editStepStatus", value: e.target.value })}>
                                                    <option value={false} selected={state.step.isCompleted == false ? true : false}>No</option>
                                                    <option value={true} selected={state.step.isCompleted == true ? true : false}>Yes</option>
                                                </select>
                                            </div>
                                            <button type="submit" >Update</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )
                    })}
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
    // } else {
    //     return (
    //         <PageNotFound />
    //     )
    // }





}

export default ProjectView