import React, { useEffect, useState, useContext } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import { useImmerReducer } from 'use-immer'
import StateContext from '../StateContext'
import Axios from 'axios'

const useStyles = createUseStyles(theme => {

})

function ProjectView(props) {
    const { id } = useParams()
    const appState = useContext(StateContext)


    const initialState = {
        project: {
            title: "",
            description: ""
        },
        editCount: 0
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "setProject":
                draft.project = action.data
                return
            case "titleEdit":
                draft.project.title = action.data
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
                    const response = await Axios.get(`http://localhost:5000/projects/${id}`, { headers: { "freedashToken": appState.token } })
                    dispatch({ type: "setProject", data: response.data })
                    console.log(response.data)
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
    }, [])

    function handleTitleEdit(e) {
        e.preventDefault()
        dispatch({ type: "titleEdit", data: e.value })
        dispatch({ type: "descriptionEdit", data: state.project.description })
    }

    function handleDescriptionEdit(e) {
        e.preventDefault()
        dispatch({ type: "descriptionEdit", data: e.value })
        dispatch({ type: "titleEdit", data: state.project.title })
    }



    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        console.log(state.project._id)
        console.log(state.project.title)
        if (id) {
            async function fetchProject() {
                try {
                    const response = await Axios.post(`http://localhost:5000/projects/${id}/edit`, { title: state.project.title, description: state.project.description }, { headers: { "freedashToken": appState.user.token } })
                    console.log(response.data)
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
    }, [state.project])



    useEffect(() => {
        console.log(state.project.title)
    }, [state.project])

    const classes = useStyles()
    const project = state.project
    return (
        <div className={classes.project}>
            <div className={classes.projectHeader}>
                <form>
                    <input onKeyUp={e => dispatch({ type: "titleEdit", value: e.target.value })} placeholder={project ? project.title : "Give your project a title"}>{project.title}</input>
                    <textarea onKeyUp={handleDescriptionEdit} value={project ? project.descruotion : "Build something awesome."}></textarea>
                </form>
                <p>{project.description}</p>
            </div>
        </div>
    )
}

export default ProjectView