import React, { useEffect, useContext } from "react"
import { createUseStyles } from "react-jss"
import StateContext from "../StateContext"
import { useImmerReducer } from "use-immer"
import Axios from "axios"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function Projects() {
  const appState = useContext(StateContext)

  const initialState = {
    projects: []
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchProjects":
        draft.projects.push(action.data)
        return
    }
  }

  const loggedInUser = appState.user

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    if (appState.user) {
      async function fetchProjects() {
        try {
          const token = loggedInUser.token
          console.log(token)
          console.log(loggedInUser)
          const userId = loggedInUser.id
          console.log(userId)
          const response = await Axios.get("http://localhost:5000/projects/", { userId: userId }, { headers: { freedashToken: token } })

          if (response.data) {
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

    return () => ourRequest.cancel()
  }, [])

  const classes = useStyles()
  return <div>{}</div>
}

export default Projects
