import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import { Link } from "react-router-dom"
import clsx from "clsx"
import Projects from "./Projects"

const useStyles = createUseStyles(theme => ({
  home: {
    display: theme.layout.default.display,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    flexDirection: "column",
    "@media ( min-width: 550px )": {}
  },

  homeText: {
    display: theme.layout.default.display,
    flex: 1,
    flexDirection: "column",
    width: "100%",
    marginBottom: theme.layout.default.marginBottom,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    "& h2": {
      display: theme.layout.default.display,
      alignSelf: "flex-center"
    },
    "& p": {
      display: theme.layout.default.display
    },
    "& a": {
      textDecoration: "none"
    },
    "& button[type='submit']": {
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#6767ff",
      color: "#fff",
      fontSize: 18,
      flex: 2,
      borderRadius: 5,
      boxSizing: "border-box",
      border: "1px solid #f1f1f1"
    }
  }
}))

function Home(props) {
  const classes = useStyles()
  return (
    <div className={clsx(classes.homeDashboard, classes.home)}>
      <div className={classes.homeText}>
        <h2 className={classes.homeMsg}>Welcome to your Free Dashboard!</h2>
        <p>Create unlimited projects and track them as you progress.</p>
        <Link to="/projects/create">
          <button type="submit">Create Project</button>
        </Link>
        <Projects />
      </div>
    </div>
  )
}

export default Home
