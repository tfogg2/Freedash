import React, { useState, useEffect, useContext } from "react"
import { withRouter } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import DispatchContext from "../DispatchContext"
import { CSSTransition } from "react-transition-group"
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles(theme => ({
  defaultForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
}))

function Register(props) {
  const initialState = {
    displayName: {
      value: "",
      hasErrors: false,
      message: "",
      checkCount: 0
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    passwordCheck: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  }

  const appDispatch = useContext(DispatchContext)

  const classes = useStyles()

  function ourReducer(draft, action) {
    switch (action.type) {
      // case "usernameImmediately":
      //   draft.username.hasErrors = false
      //   draft.username.value = action.value
      //   if (draft.username.value.length > 30) {
      //     draft.username.hasErrors = true
      //     draft.username.message = "Username cannot exceed 30 characters"
      //   }
      //   if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
      //     draft.username.hasErrors = true
      //     draft.username.message = "Username can only include letters and numbers."
      //   }
      //   return
      // case "usernameAfterDelay":
      //   if (draft.username.value.length < 3) {
      //     draft.username.hasErrors = true
      //     draft.username.message = "Username must be atleast three characters."
      //   }
      //   if (!draft.hasErrors && !action.noRequest) {
      //     draft.username.checkCount++
      //   }
      //   return
      // case "usernameUniqueResults":
      //   if (action.value) {
      //     draft.username.hasErrors = true
      //     draft.username.isUnique = false
      //     draft.username.message = "That username is already taken."
      //   } else {
      //     draft.username.isUnique = true
      //   }
      //   return
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.value = action.value
        return
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "You must provide a valid email address."
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++
        }
        return
      case "emailUniqueResults":
        if (action.value) {
          draft.email.hasErrors = true
          draft.email.isUnique = false
          draft.email.message = "That email is already being used."
        } else {
          draft.email.isUnique = true
        }
        return
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.value = action.value
        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true
          draft.password.message = "Password cannot exceed 50 characters."
        }
        return
      case "passwordAfterDelay":
        if (draft.password.value.length < 5) {
          draft.password.hasErrors = true
          draft.password.message = "Password must be atleast 5 characters"
        }
        return
      case "passwordCheckImmediately":
        draft.passwordCheck.hasErrors = false
        draft.passwordCheck.value = action.value

        return
      case "passwordCheckAfterDelay":
        if (!draft.passwordCheck == draft.password) {
          draft.passwordCheck.hasErrors = true
          draft.passwordCheck.message = "Password's do not match."
        }
        return
      case "submitForm":
        if (!draft.passwordCheck.hasErrors && !draft.email.hasErrors && !draft.password.hasErrors) {
          //&& draft.username.isUnique && draft.email.isUnique
          draft.submitCount++
        }
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  // useEffect(() => {
  //   if (state.username.value) {
  //     const delay = setTimeout(() => dispatch({ type: "usernameAfterDelay" }), 800)
  //     return () => clearTimeout(delay)
  //   }
  // }, [state.username.value])

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: "passwordAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.password.value])

  useEffect(() => {
    if (state.passwordCheck.value) {
      const delay = setTimeout(() => dispatch({ type: "passwordCheckAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.passwordCheck.value])

  // useEffect(() => {
  //   if (state.username.checkCount) {
  //     const ourRequest = Axios.CancelToken.source()
  //     async function fetchResults() {
  //       try {
  //         const response = await Axios.post("http://localhost:5000/users/doesUsernameExist", { username: state.username.value }, { cancelToken: ourRequest.token })
  //         dispatch({ type: "usernameUniqueResults", value: response.data })
  //       } catch (e) {
  //         console.log("There was a problem or the request was canceled")
  //       }
  //     }
  //     fetchResults()

  //     return () => ourRequest.cancel()
  //   }
  // }, [state.username.checkCount])

  useEffect(() => {
    if (state.email.checkCount) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("http://localhost:5000/users/doesEmailExist", { email: state.email.value }, { cancelToken: ourRequest.token })
          dispatch({ type: "emailUniqueResults", value: response.data })
        } catch (e) {
          console.log("There was a problem or the request was canceled")
        }
      }
      fetchResults()

      return () => ourRequest.cancel()
    }
  }, [state.email.checkCount])

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("http://localhost:5000/users/register", { email: state.email.value, password: state.password.value, passwordCheck: state.passwordCheck.value, displayName: state.email.value }, { cancelToken: ourRequest.token })
          appDispatch({ type: "flashMessage", value: "Welcome, you've joined the party!" })
          appDispatch({ type: "register", data: response.data })
          props.history.push(`/`)
        } catch (e) {
          console.log("There was a problem or the request was canceled")
        }
      }
      fetchResults()

      return () => ourRequest.cancel()
    }
  }, [state.submitCount])

  function handleFormSubmit(e) {
    e.preventDefault()
    // dispatch({ type: "usernameImmediately", value: state.username.value })
    // dispatch({ type: "usernameAfterDelay", value: state.username.value, noRequest: true })
    dispatch({ type: "emailImmediately", value: state.email.value })
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true })
    dispatch({ type: "passwordImmediately", value: state.password.value })
    dispatch({ type: "passwordAfterDelay", value: state.password.value })
    dispatch({ type: "passwordCheckImmediately", value: state.password.value })
    dispatch({ type: "passwordCheckAfterDelay", value: state.password.value })
    dispatch({ type: "submitForm" })
  }
  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleFormSubmit} className={classes.defaultForm}>
            <div>
              <label htmlFor="username-register">
                <small>Username</small>
              </label>
              {/* <input onChange={e => dispatch({ type: "usernameImmediately", value: e.target.value })} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
              <CSSTransition in={state.username.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.username.message}</div>
              </CSSTransition> */}
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
              <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.email.message}</div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
              <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.password.message}</div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Confirm Password</small>
              </label>
              <input onChange={e => dispatch({ type: "passwordCheckImmediately", value: e.target.value })} id="password-check-register" name="password" className="form-control" type="password" placeholder="Confirm password" />
              <CSSTransition in={state.passwordCheck.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.passwordCheck.message}</div>
              </CSSTransition>
            </div>
            <button type="submit">Register for Freedash</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Register)
