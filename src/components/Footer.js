import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  footer: {
    width: "100%",
    display: theme.layout.default.display,
    flex: 1,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    minHeight: "100px",

  }
}))

function Footer() {
  const classes = useStyles()
  return <div className={classes.footer}></div>
}

export default Footer
