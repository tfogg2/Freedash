import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import {Link} from 'react-router-dom'
import clsx from "clsx"
import HeaderLoggedOut from "./HeaderLoggedOut"

const useStyles = createUseStyles(theme => ({
  home: {
    display: theme.layout.default.display,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    flexDirection: "column",
    minHeight: "200vh"
  },
  homeText: {
    display: theme.layout.default.display,
    flex: 2,
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
      textDecoration: "none",
      "& button": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#6767ff",
        textDecoration: "none",
        fontWeight: "900",
        color: "#fff",
        fontSize: 18,
        cursor: "pointer",
        height: 60,
        padding: "0 20px",
        borderRadius: 5,
        boxSizing: "border-box",
        border: "1px solid #f1f1f1"
      }
    }
   
  },
  homeScreen: {
    display: theme.layout.default.display,
    flex: 1,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    color: "white",
    width: "100%"
  },
  screenOne: {
    background: "#FF4D66"
  },
  screenTwo: {
    background: "#FFF966"
  },
  screenThree: {
    background: "#33BFFF"
  },
  screenFour: {
    background: "#2F2F2F",
    flex: 2
  }
}))

function HomeGuest() {
  const classes = useStyles()
  return (
    <div className={classes.home}>
      <div className={classes.homeText}>
        <h2 className={classes.homeMsg}>Welcome to Freedash!</h2>
        <p>Create unlimited projects and track them as you progress.</p>
        <Link to="/register"><button>Create Account</button></Link>
      </div>
      <div className={clsx(classes.homeScreen, classes.screenOne)}>One</div>
      <div className={clsx(classes.homeScreen, classes.screenTwo)}>Two</div>
      <div className={clsx(classes.homeScreen, classes.screenThree)}>Three</div>
      <div className={clsx(classes.homeScreen, classes.screenFour)}>Four</div>
    </div>
  )
}

export default HomeGuest
