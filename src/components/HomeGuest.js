import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import clsx from "clsx"
import HeaderLoggedOut from "./HeaderLoggedOut"

const useStyles = createUseStyles(theme => ({
  home: {
    display: theme.layout.default.display,
    padding: theme.layout.default.padding,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    flexDirection: "column",
    minHeight: "200vh"
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
  },
  homeScreen: {
    display: theme.layout.default.display,
    flex: 1,
    marginBottom: theme.layout.default.marginBottom
  }
}))

function HomeGuest() {
  const classes = useStyles()
  return (
    <div className={classes.home}>
      <div className={classes.homeText}>
        <h2 className={classes.homeMsg}>Welcome to Freedash!</h2>
        <p>Create unlimited projects and track them as you progress.</p>
        <button>Create Account</button>
      </div>
      <div className={clsx(classes.homeScreen, classes.screenOne)}>One</div>
      <div className={clsx(classes.homeScreen, classes.screenTwo)}>Two</div>
      <div className={clsx(classes.homeScreen, classes.screenThree)}>Three</div>
    </div>
  )
}

export default HomeGuest
