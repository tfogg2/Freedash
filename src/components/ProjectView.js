import React, {useEffect, useState, useContext} from 'react'
import {useParams, withRouter} from 'react-router-dom'
import {createUseStyles} from 'react-jss'
import {useImmerReducer} from 'use-immer'
import StateContext from '../StateContext'
import Axios from 'axios'

const useStyles = createUseStyles(theme => {

})

function ProjectView(props) {
    const { id } = useParams()
    const appState = useContext(StateContext)
    

    const initialState = {
        project: []
    }

    function ourReducer(draft, action) {
        switch (action.type) {
          case "setProject":
                draft.project = action.data
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
                    dispatch({type: "setProject", data: response.data})
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
            console.log('blah')
        }
      }, [])

      useEffect(() => {
        console.log(state.project)
        
      }, [state.project])

    const classes = useStyles()
    const project = state.project
    return(
        <div className={classes.project}>
            <div className={classes.projectHeader}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
            </div>
        </div>
    )
}

export default ProjectView