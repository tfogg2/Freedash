import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import { ThemeProvider } from "react-jss"
import theme from "./Styles/theme"
import HeaderLoggedOut from "./components/HeaderLoggedOut"
import HeaderLoggedIn from "./components/HeaderLoggedIn"
import Home from "./components/Home"
import HomeGuest from "./components/HomeGuest"
import Login from "./components/Login"
import Projects from "./components/Projects"
import CreateProject from "./components/CreateProject"
import Register from "./components/Register"
import Footer from "./components/Footer"
import DispatchContext from "./DispatchContext"
import StateContext from "./StateContext"
import { useImmerReducer } from "use-immer"
import Axios from "axios"

function App(props) {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("freedashToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("freedashToken"),
      id: localStorage.getItem("freedashId"),
      displayName: localStorage.getItem("freedashDisplayName")
    },
    tokenCheck: 0,
    projects: []
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return

      case "logout":
        draft.loggedIn = false
        return

      case "register":
        draft.loggedIn = true
        draft.user = action.data
        return

      case "setId":
        draft.user.id = action.data
        return

      case "createProject":
        draft.projects.push(action.data)
        return

      case "checkToken":
        draft.tokenCheck++
        return

      case "flashMessage":
        draft.flashMessages.push(action.value)
        return

      case "fetchProjects":
        draft.projects = action.data
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("freedashToken", state.user.token)
      localStorage.setItem("freedashId", state.user.id)
      localStorage.setItem("freedashEmail", state.user.email)
      localStorage.setItem("freedashDisplayName", state.user.displayName)
    } else {
      localStorage.removeItem("freedashToken")
      localStorage.removeItem("freedashId")
      localStorage.removeItem("freedashEmail")
      localStorage.removeItem("freedashDisplayName")
    }
  }, [state.loggedIn])

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("freedashId", state.user.id)
    } else {
      localStorage.removeItem("freedashId")
    }
  }, [state.user.id])

  //check if token has expired on first render

  useEffect(() => { })

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const token = state.user.token
          const response = await Axios.post("http://localhost:5000/users/checkToken", { token: token }, { cancelToken: ourRequest.token }, { headers: { freedashToken: token } })
          if (!response.data) {
            dispatch({ type: "logout" })
            props.history.push("")
            dispatch({ type: "flashMessage", value: "Your session has expired. Please login again." })
          }
        } catch (e) {
          console.log("There was a problem or the request was canceled")
        }
      }
      fetchResults()

      return () => ourRequest.cancel()
    }
  }, [])

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const token = state.user.token
          const responseToken = await Axios.post("http://localhost:5000/users/tokenIsValid", null, { headers: { freedashToken: token } })
          if (responseToken.data) {
            const response = await Axios.post("http://localhost:5000/users/checkToken", { token: token }, { cancelToken: ourRequest.token }, { headers: { freedashToken: token } })
            if (!response.data) {
              dispatch({ type: "logout" })
              props.history.push("")
              dispatch({ type: "flashMessage", value: "Your session has expired. Please login again." })
            }
          }
        } catch (e) {
          console.log("There was a problem or the request was canceled")
        }
      }
      fetchResults()

      return () => ourRequest.cancel()
    }
  }, [state.tokenCheck])

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("freedashToken")
      if (token === null) {
        localStorage.setItem("freedashToken", "")
        token = ""
      }
      const response = await Axios.post("http://localhost:5000/users/tokenIsValid", null, { headers: { freedashToken: token } })

      if (response.data) {
        const userRes = await Axios.get("http://localhost:5000/users/:id", { headers: { freedashToken: token } })
        dispatch({
          type: "setId",
          data: userRes.data.id
        })
      }
    }

    checkLoggedIn()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <BrowserRouter>
            {state.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
            <Switch>
              {state.loggedIn ? <Route path="/" component={Home} exact /> : <Route path="/" component={HomeGuest} exact />}
              <Route path="/login" component={Login} exact />
              <Route path="/projects" component={Projects} exact />
              <Route path="/projects/create" component={CreateProject} exact />
              <Route path="/register" component={Register} exact />
            </Switch>
            <Footer />
          </BrowserRouter>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </ThemeProvider>
  )
}

export default App
