import React, { useEffect, useContext } from "react"
import { Link, NavLink, withRouter } from "react-router-dom"
import { createUseStyles } from "react-jss"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import ReactTooltip from "react-tooltip"

const useStyles = createUseStyles(theme => ({
  header: {
    display: theme.layout.default.display,
    padding: theme.layout.default.padding,
    flexDirection: theme.layout.default.flexDirection,
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent
  },
  logo: {
    display: theme.layout.default.display,
    flex: 11,
    alignSelf: "flex-start",
    padding: "0 40px",
    "& a": {
      textDecoration: "none",
      color: "black"
    }
  },
  mainNav: {
    display: theme.layout.default.display,
    flex: 1,
    padding: "0 40px",
    justifyContent: "right",
    "& ul": {
      listStyleType: "none"
    },
    "& a": {
      marginRight: 20,
      textDecoration: "none"
    }
  }
}))

function HeaderLoggedIn(props) {
  const classes = useStyles()
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogout(e) {
    e.preventDefault()
    appDispatch({ type: "logout" })
    props.history.push("")
    appDispatch({ type: "flashMessage", value: "You have successfully logged out!" })
  }

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <h1>
          <Link to="/">Freedash</Link>
        </h1>
      </div>
      <div className={classes.mainNav}>
        <ul>
          <li>
            <NavLink to="/projects">Dashboard</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/logout" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(HeaderLoggedIn)
