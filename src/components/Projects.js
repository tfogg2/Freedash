import React, { useEffect, useContext } from "react"
import { createUseStyles } from "react-jss"
import StateContext from "../StateContext"
import { useImmerReducer } from "use-immer"
import DispatchContext from '../DispatchContext'
import Axios from "axios"

const useStyles = createUseStyles(theme => ({
  projectList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    listStyleType: "none",
    alignItems: "left",
    justifyContent: "left"
  },
  project: {
    paddingTop: 20,
    display: "flex",
    flex: 1
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
    }
  }, [])

  const classes = useStyles()
  return (
    <ul className={classes.projectList}>
      {appState.projects.map(project => {
        return (
          <div className={classes.project}>
            <li>
              {project.title}
            </li>
          </div>
        )
      })}
    </ul>
  )
}

export default Projects
