import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
import { withRouter } from "react-router-dom"
import { useImmer } from "use-immer"

function Register(props) {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loggedIn, setLoggedIn] = useState()
  const appDispatch = useContext(DispatchContext)
  const [state, setState] = useImmer()

  async function handleFormSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("http://localhost:8080/register", { username, password, email })
      console.log(response.data)
      appDispatch({ type: "flashMessage", value: "Welcome, you've joined Freedash!" })
      appDispatch({ type: "login", data: response.data })
      props.history.push(`/profile/${username}`)
      console.log("User was successfully created")
    } catch (e) {
      appDispatch({ type: "flashMessage", value: e.data })
      console.log(e.data)
      console.log("There was a problem")
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="username-register" className="text-muted mb-1">
          <small>Username</small>
        </label>
        <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
      </div>
      <div className="form-group">
        <label htmlFor="email-register" className="text-muted mb-1">
          <small>Email</small>
        </label>
        <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
      </div>
      <div className="form-group">
        <label htmlFor="password-register" className="text-muted mb-1">
          <small>Password</small>
        </label>
        <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
      </div>
      <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
        Sign up for Freedash
      </button>
    </form>
  )
}

export default withRouter(Register)
