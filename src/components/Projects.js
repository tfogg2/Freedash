import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function Projects() {
  const classes = useStyles()
  return (
    <div>
      <div></div>
    </div>
  )
}

export default Projects
