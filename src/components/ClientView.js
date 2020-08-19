import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { useImmerReducer } from 'use-immer'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'
import clsx from 'clsx'
import Axios from 'axios'

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
    toggleButtons: {
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    toggleButton: {
        // position: "fixed",
        // bottom: "-5px",
        display: "flex",
        flex: 1,
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
        border: "none",
        marginRight: 10,
        "&:hover": {
            background: "#fff",
            color: "#6767ff",
            border: "1px solid #6767ff",
        }
    },
    closeBtn: {
        background: "#fff",
        color: "#6767ff",
        border: "none",
        marginRight: 10,
        "&:hover": {
            background: "#6767ff",
            color: "#fff",
            border: "1px solid #f1f1f1",
        }
    },
    copyBtn: {
        background: "#fff",
        color: "#6767ff",
        border: "1px solid #6767ff",
        marginLeft: 10,
        "&:hover": {
            background: "#6767ff",
            color: "#fff",
            border: "1px solid #f1f1f1",
        }
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
    shareLink: {
        display: "none"
    }
}))

function ClientView() {
    const initialState = {
        shareToken: useParams().token,
        projectId: useParams().id,
        project: {
            title: "",
            description: "",
            steps: [],
            userId: "",
            isLoaded: false
        },
        progress: 0,
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

            case "countCompleted":
                draft.countCompleted = action.value
                return

            case "setProgress":
                draft.progress = action.value
                return
        }
    }

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        async function checkToken() {
            try {

                const response = await Axios.get(`http://localhost:5000/share/${state.projectId}/${state.shareToken}`, { projectId: state.projectId })
                if (response.data) {
                    console.log(response.data)
                    dispatch({ type: "setProject", value: response.data })
                    appDispatch({ type: "flashMessage", value: "Project successfully loaded!" })
                } else {
                    console.log("There was an error.")
                }
            } catch {
                console.log("There was an error.")
            }
        }
        checkToken()
    }, [])

    useEffect(() => {
        async function progressBar() {
            try {
                const totalDuration = await Axios.get(`http://localhost:5000/share/${state.projectId}/${state.shareToken}/steps/progress`, { projectId: state.projectId })
                const completedDuration = await Axios.get(`http://localhost:5000/share/${state.projectId}/${state.shareToken}/steps/completed`, { projectId: state.projectId })
                dispatch({ type: "countCompleted", value: completedDuration.data })
                const progress = ((completedDuration.data / totalDuration.data) * 100)
                const width = "width: " + progress + "%"
                console.log(width)
                dispatch({ type: "setProgress", value: progress })
            } catch (e) {
                console.log("There was an error." + e)
            }
        }
        progressBar()
    }, [])

    const classes = useStyles()
    const percentage = state.progress + "%"

    return (
        <div className={classes.project}>
            <div className={classes.porjectInfo}>
                <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                    <h1>{state.project.title}</h1>
                </div>
                <div className={clsx(classes.formHolder, classes.porjectInfoHolder)}>
                    <h1>{state.project.description}</h1>
                </div>
                <div className={classes.progressBarContianer}>
                    <span className={classes.fullBar}>
                        <span className={classes.progressBar} style={{ width: percentage }}></span>
                    </span>
                </div>
            </div>
            <div className={classes.steps}>
                {state.project.steps.map(step => {
                    return (
                        // <Step step={step} />
                        <div>

                            <div onClick={e => { dispatch({ type: "setStep", value: step }) }} className={step.isCompleted ? clsx(classes.step, classes.stepCompleted) : classes.step}>
                                <div className={classes.stepBody}>
                                    <h3>
                                        {step.name}
                                    </h3>
                                </div>

                                <div className={classes.stepDuration}>
                                    <p>{step.duration ? step.duration + " minutes" : <></>}</p>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ClientView