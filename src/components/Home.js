import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import clsx from "clsx"

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
    "& button": {
      display: theme.layout.default.display
    }
  }
}))

function Home() {
  const classes = useStyles()
  return (
    <div className={clsx(classes.homeDashboard, classes.home)}>
      <div className={classes.homeText}>
        <h2 className={classes.homeMsg}>Welcome to your Free Dashboard!</h2>
        <p>Create unlimited projects and track them as you progress.</p>
        <button>Create Project</button>
      </div>
    </div>
  )
}

export default Home
