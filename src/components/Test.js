import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function ComponentName() {
  const classes = useStyles()
  return (
    <>

    </>
  )
}

export default ComponentName