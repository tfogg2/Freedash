import React, { useEffect, useContext } from "react"
import { createUseStyles } from "react-jss"
import { Link } from "react-router-dom"
import Axios from 'axios'
import DispatchContext from '../DispatchContext'
import StateContext from '../StateContext'
import clsx from "clsx"
import Projects from "./Projects"

const useStyles = createUseStyles(theme => ({
  home: {
    display: theme.layout.default.display,
    alignItems: "start",
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
    flex: 2,
    lineHeight: "10px",
    paddingTop: 55,
    justifyContent: "center",
    "& button": {
      display: "flex",
      alignItems: "center",
      width: "50%",
      minWidth: "186px",
      margin: "0 auto",
      justifyContent: "center",
      background: "#6767ff",
      textDecoration: "none",
      fontWeight: "900",
      color: "#fff",
      fontSize: 16,
      cursor: "pointer",
      height: 42,
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
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  async function handleNewProject(e) {
    e.preventDefault()
    try {

      const token = appState.user.token
      // const check = await appDispatch({type: "checkToken"})
      // const check = await Axios.post("http://localhost:5000/users/checkToken", { token: loggedInUser.token }, { cancelToken: ourRequest.token })
      const response = await Axios.post("http://localhost:5000/projects/create", { title: "", description: "", userId: appState.user.id, steps: [] }, { headers: { "freedashToken": token } })
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "createProject", data: response.data })

        props.history.push(`/projects/${response.data._id}`)
      } else {
        appDispatch({ type: "flashMessage", value: "" })
      }


    } catch (e) {
      console.log("There was a problem!" + e)
    }
  }

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
        <button onClick={handleNewProject} type="submit">Create new project</button>
      </div>
    </div>
  )
}

export default Home
