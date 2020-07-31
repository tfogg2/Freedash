import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { createUseStyles } from "react-jss"
import DispatchContext from "../DispatchContext"
import clsx from "clsx"

const useStyles = createUseStyles(theme => ({
  defaultFormPage: {
    display: "flex",
    background: "#6767ff",
    padding: "100px 0",
    flexDirection: "row"
  },
  defaultForm: {
    display: "flex",
    flex: 4,
    background: "#f9f9f9",
    borderRadius: 10,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  defaultFormTitle: {
    textAlign: "center",
    "& h2": {
      fontSize: 28,
      color: "#1d1d1d",
      marginTop: 0,
      "& span": {
        color: "#6767ff"
      }
    }
  },
  defaultSideBar: {
    display: "flex",
    flex: 2
  },
  defaultFormHolder: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  formControlHolder: {
    margin: "10px 0",
    display: "flex",
    flex: 1,
    "& input": {
      height: "40px",
      display: "flex",
      textAlign: "center",
      background: "#fff",
      fontSize: 14,
      flex: 1,
      borderRadius: 5,
      border: "1px solid #f1f1f1"
    },
    "& button[type='submit']": {
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#6767ff",
      color: "#fff",
      fontSize: 18,
      flex: 2,
      borderRadius: 5,
      boxSizing: "border-box",
      border: "1px solid #f1f1f1"
    }
  }
}))

function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const classes = useStyles()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("http://localhost:5000/users/login", { email, password })
      if (response.data) {
        console.log(response.data)
        appDispatch({ type: "login", data: response.data })
        appDispatch({ type: "flashMessage", value: "You have successfully logged in!" })

        props.history.push("/")
        const id = response.data.user.id
        appDispatch({ type: "setId", data: id })
      } else {
        console.log("Incorrect username or password.")
        appDispatch({ type: "flashMessage", value: "Invalid Username/Password" })
      }
    } catch (e) {
      console.log("There was a problem!" + e)
    }
  }

  return (
    <div className={classes.defaultFormPage}>
      <div className={classes.defaultSideBar}></div>
      <form onSubmit={handleSubmit} className={classes.defaultForm}>
        <div className={classes.defaultFormHolder}>
          <div className={classes.defaultFormTitle}>
            <h2>
              Login to <span>FreeDash</span>
            </h2>
          </div>
          <div className={classes.defaultFormHolder}>
            <div className={classes.formControlHolder}>
              <input onChange={e => setEmail(e.target.value)} name="email" className={classes.formControl} type="text" placeholder="Email" autoComplete="off" />
            </div>
            <div className={classes.formControlHolder}>
              <input onChange={e => setPassword(e.target.value)} name="password" className={classes.formControl} type="password" placeholder="Password" />
            </div>
            <div className={classes.formControlHolder}>
              <button type="submit">Sign In</button>
            </div>
          </div>
        </div>
      </form>
      <div className={classes.defaultSideBar}></div>
    </div>
  )
}

export default Login
