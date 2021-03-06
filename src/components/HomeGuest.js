import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import { Link } from 'react-router-dom'
import clsx from "clsx"
import HeaderLoggedOut from "./HeaderLoggedOut"

const useStyles = createUseStyles(theme => ({
  home: {
    display: theme.layout.default.display,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    height: "82vh",
    background: "#ffefa6",
    flexDirection: "column"
  },
  homeText: {
    display: theme.layout.default.display,
    flex: 1,
    height: "fit-content",
    flexDirection: "column",
    width: "80%",
    "@media (min-width: 601px)": {
      width: "50%"
    },
    "@media (max-width: 600px)": {
      width: "80%"
    },
    alignItems: "left",
    justifyContent: "center",
    "& h1": {
      display: theme.layout.default.display,
      flex: 0,
      fontSize: "72px",
      width: "50%",
      color:"#15157f",
      alignSelf: "flex-center",
      margin: 0
    },
    "& p": {
      display: theme.layout.default.display,
      fontSize: 18,
      lineHeight: "32px",
      opacity: ".8",
      color:"#15157f",
      width: "80%",
      flex: 0,
    },
    "& a": {
      textDecoration: "none",
      "& button": {
        display: "flex",
        alignItems: "center",
        flex: 1,
        width: "40%",
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
        <h1 className={classes.homeMsg}>The Freelancer Dashboard</h1>
        <p>Organize your projects and let clients track your progress.</p>
        <Link to="/register"><button>Get Started</button></Link>
      </div>
      {/* <div className={clsx(classes.homeScreen, classes.screenOne)}>One</div>
      <div className={clsx(classes.homeScreen, classes.screenTwo)}>Two</div>
      <div className={clsx(classes.homeScreen, classes.screenThree)}>Three</div>
      <div className={clsx(classes.homeScreen, classes.screenFour)}>Four</div> */}
    </div>
  )
}

export default HomeGuest
