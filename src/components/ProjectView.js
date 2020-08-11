import React, { useEffect, useState, useContext } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { useImmerReducer } from 'use-immer'
import StateContext from '../StateContext'
import Axios from 'axios'
import Step from './Step'
import clsx from 'clsx'
import Select from 'react-select';

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
            background: "#6767ff",
            textDecoration: "none",
            fontWeight: "900",
            color: "#fff",
            fontSize: 16,
            cursor: "pointer",
            height: 42,
            padding: "0 20px",
            borderRadius: 5,
            boxSizing: "border-box",
            border: "1px solid #f1f1f1"
        }
    },
    showAddStep: {
        position: "fixed",
        bottom: "-5px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        background: "#6767ff",
        textDecoration: "none",
        fontWeight: "900",
        color: "#fff",
        fontSize: 16,
        cursor: "pointer",
        height: 42,
        padding: "0 20px",
        borderRadius: 5,
        boxSizing: "border-box",
        border: "1px solid #f1f1f1"
    },
    formHolder: {
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
    projectTitle: {
        background: "#fff",
        border: "none",
        width: "100%",
        outline: 0,
        fontSize: 40,
        lineHeight: "48px",
        marginBottom: 40,
    },
    projectDescription: {
        background: "#fff",
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
        color: "#fff"
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
    }

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
                draft.project.steps.push(action.value)
                return

            case "addSteps":
                draft.project.steps.push(action.data)
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


    useEffect(() => {
        dispatch({ type: "clearNewStep" })
    }, [state.project.steps])


    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        if (id) {
            async function fetchProject() {
                try {
                    const edit = await Axios.post(`http://localhost:5000/projects/${state.id}/edit`, { title: state.project.title, description: state.project.description, steps: state.project.steps, userId: appState.user.id }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
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
        dispatch({ type: "stepDuration", value: "" })
        console.log(state.newStep.duration)
        dispatch({ type: "toggleStep" })
    }

    const classes = useStyles()
    const project = state.project

    if (state.project.isLoaded) {
        return (
            <div className={classes.project}>
                <div className={classes.formHolder}>
                    <form>
                        <input className={classes.projectTitle} type="text" onChange={e => dispatch({ type: "editTitle", value: e.target.value })} value={project.title} placeholder={project.title !== "" ? "" : "Give your project a title"} />
                    </form>
                </div>
                <div className={classes.formHolder}>
                    <form>
                        <input className={classes.projectDescription} onChange={e => dispatch({ type: "editDescription", value: e.target.value })} value={project.description} placeholder={project.description !== "" ? "" : "Build something awesome."} />
                    </form>
                </div>

                {!state.isStepOpen ? <button onClick={toggleAddStep} className={state.isStepOpen ? classes.hide : classes.showAddStep}>Add Step</button> : (
                    // MAKE THIS A TRANSITION GROUP
                    <div className={state.isStepOpen ? classes.stepFormHolder : classes.hide}>
                        <div className={classes.stepInfo}>
                            <h2>Add Step</h2>
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
                        <span onClick={toggleAddStep}>x</span>
                    </div>
                )}


                <div className={classes.steps}>
                    {project.steps.map(step => {
                        return (
                            <Step step={step} />
                        )
                    }).reverse()}
                </div>
            </div >
        )
    } else {
        return (
            <div className={classes.project}>
                <div className={classes.formHolder}>
                    <form >
                        <input className={classes.projectTitle} type="text" placeholder={project.title !== "" ? "" : "Give your project a title"}></input>
                    </form>
                </div>
                <div className={classes.formHolder}>
                    <form>
                        <textarea className={classes.projectDescription} placeholder={project.description !== "" ? "" : "Build something awesome."}></textarea>
                    </form>
                </div>

            </div>
        )
    }



}

export default ProjectView