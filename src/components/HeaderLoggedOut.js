import React, { useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { createUseStyles } from "react-jss"

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
