import React, { useEffect, useContext } from "react"
import { createUseStyles } from "react-jss"
import StateContext from "../StateContext"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function Projects() {
  const appState = useContext(StateContext)

  useEffect(() => {}, [appState.projects])

  const classes = useStyles()
  return <div>{}</div>
}

export default Projects
