import React, { useEffect, useContext } from "react"
import { createUseStyles } from "react-jss"
import StateContext from "../StateContext"
import { useImmerReducer } from "use-immer"
import DispatchContext from '../DispatchContext'
import Axios from "axios"
import Project from './Project'

const useStyles = createUseStyles(theme => ({
  projectList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    listStyleType: "none",
    width: "100%",
    padding: "0 0px"
  }
}))

function Projects() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)
  const loggedInUser = appState.user

  useEffect(() => {
    if (loggedInUser) {
      async function fetchProjects() {
        try {
          const token = loggedInUser.token
          const response = await Axios.get("http://localhost:5000/projects/", { headers: { "freedashToken": token } })
          if (response.data) {
            appDispatch({ type: "fetchProjects", data: response.data })
            console.log(response.data)
          } else {
            console.log("No data")
          }
        } catch (e) {
          console.log("Something failed." + e)
        }
      }
      fetchProjects()
    } else {
      appDispatch({ type: "fetchProjects", data: [] })
    }
  }, [])

  const classes = useStyles()
  const projects = appState.projects
  return (
    <ul className={classes.projectList}>
      {projects.map(project => {
        return (
          <Project project={project} />
        )
      }).reverse()}
    </ul>
  )
}

export default Projects
