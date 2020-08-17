import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  exampleStyle: {
    height: theme.x
  }
}))

function PageNotFound() {
  const classes = useStyles()
  return (
    <>

    </>
  )
}

export default PageNotFound