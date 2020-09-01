import React, { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  header: {
    display: theme.layout.default.display,
    padding: theme.layout.default.padding,
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
    "@media (max-width: 600px)": {
      display: "none"
    },
    flex: 1,
    padding: "0 40px",
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

function HeaderLoggedOut() {
  const classes = useStyles()
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
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            {/* <NavLink to="/about">About</NavLink> */}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderLoggedOut
