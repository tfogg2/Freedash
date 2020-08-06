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
        editCount: 0,
        id: useParams().id,
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "setProject":
                draft.project.title = action.value.title
                draft.project.description = action.value.description
                draft.editCount++
                return
            case "editTitle":
                draft.project.title = action.value
                draft.editCount++
                return
            case "editDescription":
                draft.project.description = action.value
                draft.editCount++
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
                    const response = await Axios.get(`http://localhost:5000/projects/${id}`, { headers: { "freedashToken": appState.token } }, { cancelToken: ourRequest.token })
                    if (response.data) {
                        dispatch({ type: "setProject", value: response.data })
                        console.log(response.data)
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
    }, [state.id])




    useEffect(() => {
        const ourRequest = Axios.CancelToken.source()
        if (id) {
            async function fetchProject() {
                try {
                    const edit = await Axios.post(`http://localhost:5000/projects/${id}/edit`, { title: state.project.title, description: state.project.description }, { headers: { "freedashToken": appState.user.token } }, { cancelToken: ourRequest.token })
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
    }, [state.editCount])

    const classes = useStyles()
    const project = state.project
    return (
        <div className={classes.project}>
            <div className={classes.projectHeader}>
                <form>
                    <input type="text" onChange={e => dispatch({ type: "editTitle", value: e.target.value })} value={project.title !== "" ? project.title : ""} placeholder={project.title !== "" ? "" : "Give your project a title"}></input>
                    <textarea onChange={e => dispatch({ type: "editDescription", value: e.target.value })} value={project.description !== "" ? project.description : ""} placeholder={project.description !== "" ? "" : "Build something awesome."}></textarea>
                </form>
            </div>
        </div>
    )
}

export default ProjectView