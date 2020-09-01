import React from "react"
import { Link } from 'react-router-dom'
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(() => ({
  pageNotFound: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    "& a": {
      color: "6767ff",
      fontWeight: "900"
    },
    "& a:visited": {
      color: "6767ff"
    }
  }
}))

function NotFound() {
  const classes = useStyles()
  return (
    <div className={classes.pageNotFound}>
      <h1>404 Oops... This page doesn't exist</h1>
      <p>Visit the <Link to="/">Homepage</Link> to get back on track</p>
    </div>
  )
}

export default NotFound