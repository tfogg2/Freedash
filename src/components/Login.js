import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import {createUseStyles} from 'react-jss'
import DispatchContext from "../DispatchContext"
import clsx from 'clsx'

const useStyles = createUseStyles( () => ({
  defaultForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
    textAlign: "center"

  }
}))



function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const classes = useStyles()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("http://localhost:5000/users/login", { username, password })
      if (response.data) {
        appDispatch({ type: "login", data: response.data })
        appDispatch({ type: "flashMessage", value: "You have successfully logged in!" })
      } else {
        console.log("Incorrect username or password.")
        appDispatch({ type: "flashMessage", value: "Invalid Username/Password" })
      }
    } catch (e) {
      console.log("There was a problem!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.defaultForm}>
      <div className={classes.defaultFormHolder}>
        <div className={classes.formControlHolder}>
          <input onChange={e => setUsername(e.target.value)} name="username" className={classes.formControl} type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className={classes.formControlHolder}>
          <input onChange={e => setPassword(e.target.value)} name="password" className={classes.formControl} type="password" placeholder="Password" />
        </div>
        <div className={classes.formControlHolder}>
          <button className={clsx(classes.btn, classes.btnSuccess)}>Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default Login
