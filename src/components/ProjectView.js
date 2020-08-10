import React, { useEffect, useState, useContext } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { useImmerReducer } from 'use-immer'
import StateContext from '../StateContext'
import Axios from 'axios'

const useStyles = createUseStyles(theme => ({
    project: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100
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
        minHeight: "200px",
        outline: 0,
        fontSize: 16,
        lineHeight: "26px",
        marginBottom: 40,
    },

}))

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
            duration: 0
        },
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

            case "addStep":
                draft.project.steps.push(action.value)
                return

            case "addSteps":
                draft.project.steps.push(action.data)
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
            const response = await Axios.post(`http://localhost:5000/projects/${state.id}/steps/create`, { name: state.newStep.name, duration: state.newStep.duration, projectId: id, userId: appState.user.id }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
            console.log(response.data)
            if (response.data) {
                console.log(response.data)
                dispatch({ type: "isLoaded", value: true })
                dispatch({ type: "setProject", value: response.data })
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
                        <textarea className={classes.projectDescription} onChange={e => dispatch({ type: "editDescription", value: e.target.value })} value={project.description} placeholder={project.description !== "" ? "" : "Build something awesome."} />
                    </form>
                </div>
                <div className={classes.formHolder}>
                    <form onSubmit={handleAddStep}>
                        <input className={classes.stepName} onChange={e => dispatch({ type: "stepName", value: e.target.value })} />
                        <input type="number" className={classes.stepDuration} onChange={e => dispatch({ type: "stepDuration", value: e.target.value })} />
                        <button type="submit">Add Step</button>
                    </form>
                </div>
                <div className={classes.steps}>

                    {project.steps.map(step => {
                        return (
                            <h2>{step.name}</h2>
                        )
                    })}
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