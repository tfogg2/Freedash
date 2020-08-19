import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { useImmerReducer } from 'use-immer'
import StateContext from '../StateContext'
import DispatchContext from '../DispatchContext'
import clsx from 'clsx'
import Axios from 'axios'

const useStyles = createUseStyles(() => ({
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
    )
}

export default ClientView