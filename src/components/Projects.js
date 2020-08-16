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
    border: ".5px solid #f3f3f3",
    minHeight: "100vh",
    padding: "0 0px"
  },
  noProjectsHeader: {
    width: "50%",
    fontSize: "72px",
    margin: "40px auto",
    color: "#6767ff"
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
      {projects.length > 0 ? projects.map(project => { return <Project project={project} /> }).reverse() : <h1 className={classes.noProjectsHeader}>Create your first project to get started!</h1>}

    </ul>
  )
}

export default Projects
