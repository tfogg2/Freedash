import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function Step(props) {
  const classes = useStyles()
  return (
    <div className={classes.step}>
      <h3>{props.step.name}</h3>
      <p>{props.step.duration}</p>
    </div>
  )
}

export default Step