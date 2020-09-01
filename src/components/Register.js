import React, { useState, useEffect, useContext } from "react"
import { withRouter } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import DispatchContext from "../DispatchContext"
import { CSSTransition } from "react-transition-group"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles(theme => ({
  defaultPage: {
    display: "flex",
    flexDirection: "column"
  },
  defaultFormPage: {
    display: "flex",
    background: "#F7F9FA",
    paddingTop: 80,
    padding: "0",
    flexDirection: "row",
    height: "60vh"
  },
  defaultForm: {
    display: "flex",
    flex: 4,
    background: "#f9f9f9",
    borderRadius: 10,
    padding: 50,
    height: "fit-content",
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
    transition: ".33s all ease-in-out",
    display: "flex",
    "@media (min-width: 1001px)": {
      flex: 6
    },
    "@media (max-width: 1000px)": {
      flex: 4
    },
    "@media (max-width: 800px)": {
      flex: 2
    },
    "@media (max-width: 600px)": {
      flex: 0
    },
  },
  defaultFormHolder: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  formControlHolder: {
    margin: "10px 0",
    display: "flex",
    height: "60px",
    flex: 1,
    flexDirection: "column",
    "& input": {
      height: "40px",
      display: "flex",
      textAlign: "center",
      background: "#fff",
      fontSize: 14,
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
      borderRadius: 5,
      boxSizing: "border-box",
      border: "1px solid #f1f1f1"
    }
  },
  defaultFormAlert: {
    color: "red",
    position: "relative",
    top: "0px",
    height: "20px",
    textAlign: "center",
    paddingBottom: "5px"
  }
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
          draft.submitCount++
        }
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

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

  useEffect(() => {
    if (state.email.checkCount) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/users/doesEmailExist", { email: state.email.value }, { cancelToken: ourRequest.token })
          console.log(response)
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
          const response = await Axios.post("/users/register", { email: state.email.value, password: state.password.value, passwordCheck: state.passwordCheck.value, displayName: state.email.value }, { cancelToken: ourRequest.token })
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
    dispatch({ type: "emailImmediately", value: state.email.value })
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true })
    dispatch({ type: "passwordImmediately", value: state.password.value })
    dispatch({ type: "passwordAfterDelay", value: state.password.value })
    dispatch({ type: "passwordCheckImmediately", value: state.password.value })
    dispatch({ type: "passwordCheckAfterDelay", value: state.password.value })
    dispatch({ type: "submitForm" })
  }
  return (
    <div className={classes.defaultPage}>
      <div className={classes.defaultFormPage}>
        <div className={classes.defaultSideBar}></div>
        <form onSubmit={handleFormSubmit} className={classes.defaultForm}>
          <div className={classes.defaultFormHolder}>
            <div className={classes.defaultFormTitle}>
              <h2>
                Register for <span>FreeDash</span>
              </h2>
              <p>Freedash is a <span>completely free</span> product made for freelance developers. Enjoy!</p>
            </div>
            <div className={classes.formControlHolder}>
              <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className={classes.defaultFormAlert}>{state.email.message}</div>
              </CSSTransition>
              <input onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} id="email-register" name="email" type="text" placeholder="you@example.com" autoComplete="off" />

            </div>
            <div className={classes.formControlHolder}>
              <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className={classes.defaultFormAlert}>{state.password.message}</div>
              </CSSTransition>
              <input onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" type="password" placeholder="Create a password" />

            </div>
            <div className={classes.formControlHolder}>
              <CSSTransition in={state.passwordCheck.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className={classes.defaultFormAlert}>{state.passwordCheck.message}</div>
              </CSSTransition>
              <input onChange={e => dispatch({ type: "passwordCheckImmediately", value: e.target.value })} id="password-check-register" name="password" type="password" placeholder="Confirm password" />
            </div>
            <div className={classes.formControlHolder}>
              <button type="submit">Register for Freedash</button>
            </div>
          </div>
        </form>
        <div className={classes.defaultSideBar}></div>
      </div>
    </div>
  )
}

export default withRouter(Register)
