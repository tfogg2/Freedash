import React, { useEffect, useContext } from "react"
import { Link, NavLink, withRouter } from "react-router-dom"
import { createUseStyles } from "react-jss"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import ReactTooltip from "react-tooltip"

const useStyles = createUseStyles(theme => ({
  header: {
    display: theme.layout.default.display,
    
    alignItems: theme.layout.default.alignItems,
    justifyContent: theme.layout.default.justifyContent,
    "@media (min-width: 601px)":{
      padding: "20px 80px",
    },
    "@media (max-width: 600px)":{
      padding: "20px"
    },
  },
  logo: {
    display: theme.layout.default.display,
    flex: 11,
    alignSelf: "flex-start",
    "& a": {
      textDecoration: "none",
      color: "#6767ff",
      "&:hover": {
        color: "#4141bd"
      }
    }
  },
  mainNav: {
    "@media (min-width: 601px)": {
      display: theme.layout.default.display
    },
    flex: 1,
    justifyContent: "right",
    "& ul": {
      listStyleType: "none"
    },
    "& a": {
      marginRight: 20,
      textDecoration: "none",
      color: "#1d1d1d"
    },
    "& a:hover": {
      marginRight: 20,
      textDecoration: "none",
      color: "#6767ff"
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
            <NavLink to="/">Dashboard</NavLink>
            {/* <NavLink to="/about">About</NavLink> */}
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
