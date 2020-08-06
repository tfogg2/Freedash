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
    flexDirection: "row",
    "@media ( min-width: 550px )": {}
  },
  homeLeft: {
    display: "flex",
    flex: 1
  },
  homeAction: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    "& a": {
      textDecoration: "none",
    },
    "& button": {
      display: "flex",
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
      background: "#6767ff",
      textDecoration: "none",
      fontWeight: "900",
      color: "#fff",
      fontSize: 16,
      cursor: "pointer",
      height: 60,
      padding: "0 20px",
      borderRadius: 5,
      boxSizing: "border-box",
      border: "1px solid #f1f1f1"
    }
  },

  homeDash: {
    display: theme.layout.default.display,
    flex: 4,
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
    }
  }
}))

function Home(props) {
  const classes = useStyles()
  return (
    <div className={clsx(classes.homeDashboard, classes.home)}>
      <div className={classes.homeLeft}></div>
      <div className={classes.homeDash}>
        {/* <div className={classes.homeDashNav}>
          <h2>Projects</h2>
        </div> */}
        <Projects />
      </div>
      <div className={classes.homeAction}>
        <Link to="/projects/create">
          <button type="submit">Create new project</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
